namespace TSE {
  export class ZoneManager implements IMessageHandler {
    private static _globalZoneId: number = -1;
    //private static _zones: {[id: number]: Zone} = {};
    private static _registeredZones: {[id: number]: string} = {}; // the name of the json file that is requested
    private static _activeZone: Zone;
    private static _inst: ZoneManager;

    private constructor() {
      ZoneManager._inst = new ZoneManager(); // internal instance of ZoneManager, needed by IMessageHandler
      console.log('ZoneManager._inst', ZoneManager._inst);
    }

    public static initialize(): void {
      console.log('ZoneManager initialize');
      // TEMP
      ZoneManager._registeredZones[0] = 'assets/zones/testZone.json';
    }

    public static changeZone(id: number) {
      if (ZoneManager._activeZone !== undefined) {
        ZoneManager._activeZone.onDeActived();
        ZoneManager._activeZone.unLoad();
        ZoneManager._activeZone = undefined;
      }

      if (ZoneManager._registeredZones[id] !== undefined) {
        if (AssetManager.isAssetLoaded(ZoneManager._registeredZones[0])) {
          const asset = AssetManager.getAsset(ZoneManager._registeredZones[0]);
          ZoneManager.loadZone(asset);
        } else {
          const code = MESSAGE_ASSET_LOADER_ASSET_LOADED + ZoneManager._registeredZones[id];
          Message.subscribe(code, ZoneManager._inst);
          AssetManager.loadAsset(ZoneManager._registeredZones[id]);
        }
      } else {
        throw new Error('Zone id: ' + id.toString() + ' does not exist.');
      }
    }

    public static update(time: number): void {
      if(ZoneManager._activeZone !== undefined) {
        ZoneManager._activeZone.update(time);
      }
    }

    public static render(shader: Shader): void {
      if(ZoneManager._activeZone !== undefined) {
        ZoneManager._activeZone.render(shader);
      }
    }

    public onMessage(message: Message): void {
      if (message.code.indexOf(MESSAGE_ASSET_LOADER_ASSET_LOADED)) {
        const asset = message.context as JsonAsset;
        ZoneManager.loadZone(asset);
      }
    }

    /**
     * Load the actual zone from a json asset definition
     * @param asset
     */
    private static loadZone(asset: JsonAsset): void {
      console.log('asset data', asset);
      const zoneData = asset.data;
      let zoneId: number;
      if (zoneData.id === undefined) {
        throw new Error('Zone file format error, zone id not present');
      } else {
        zoneId = Number(zoneData.id);
      }

      let zoneName: string;
      if (zoneData.name === undefined) {
        throw new Error('Zone file format error, zone name not present');
      } else {
        zoneName = String(zoneData.name);
      }

      let zoneDescription: string;
      if (zoneData.description !== undefined) {
        zoneDescription = String(zoneData.description);
      }

      ZoneManager._activeZone = new Zone(zoneId, zoneName, zoneDescription);
      ZoneManager._activeZone.initialize(zoneData);
      ZoneManager._activeZone.onActived();
      ZoneManager._activeZone.load();
    }

  }
}
