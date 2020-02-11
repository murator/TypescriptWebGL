namespace TSE {
  export class ZoneManager {

    private static _globalZoneId: number = -1;
    private static _zones: {[id: number]: Zone} = {};
    private static _activeZone: Zone;

    private constructor() {

    }

    // Temporary test function, will be removed when loading from files is implemented
    public static createTestZone(): number {
      ZoneManager._globalZoneId++;
      let zone = new TestZone( ZoneManager._globalZoneId, "test", "A simple test zone" );
      console.log('zone', zone);
      ZoneManager._zones[ZoneManager._globalZoneId] = zone;
      return ZoneManager._globalZoneId;
    }

    public static createZone(name: string, description: string): number {
      ZoneManager._globalZoneId++;
      let zone = new Zone( ZoneManager._globalZoneId, name, description );
      console.log('zone', zone);
      ZoneManager._zones[ZoneManager._globalZoneId] = zone;
      return ZoneManager._globalZoneId;
    }

    public static changeZone(id: number) {
      if (ZoneManager._activeZone !== undefined) {
        ZoneManager._activeZone.onDeActived();
        ZoneManager._activeZone.unLoad();
      }

      if (ZoneManager._zones[id] !== undefined) {
        ZoneManager._activeZone = ZoneManager._zones[id];
        ZoneManager._activeZone.onActived();
        ZoneManager._activeZone.load();
      }
    }

    public static update(time: number): void {
      ZoneManager._activeZone.update(time);
    }

    public static render(shader: Shader): void {
      ZoneManager._activeZone.render(shader);
    }
  }
}
