namespace TSE {

  export enum ZoneState {
    UNINITIALIZED,
    LOADING,
    UPDATING
  }

  export class Zone {
    private _id: number;
    private _name: string;
    private _description: string;
    private _scene: Scene;
    private _state: ZoneState = ZoneState.UNINITIALIZED;
    private _globalId: number = -1;

    constructor(id: number, name: string, description: string) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._scene = new Scene();
    }

    public initialize(zoneData: any): void {
      if(zoneData.objects === undefined) {
        throw new Error('No objects found in zonData, cannot initialize');
      } else {
        for(let o in zoneData.objects) {
          let obj = zoneData.objects[o];
          this.loadSimObject(obj, this._scene.root);
        }
      }
    }

    public get id(): number {
      return this._id;
    }

    public get name(): string {
      return this._name;
    }

    public get description(): string {
      return this._description;
    }

    public get scene(): Scene {
      return this._scene;
    }

    public load(): void {
      this._state = ZoneState.LOADING;

      this._scene.load();

      this._state = ZoneState.UPDATING;
    }

    public unLoad(): void {
    }

    public update(time: number): void {
      if (this._state === ZoneState.UPDATING) {
        this._scene.update(time);
      }
    }

    public render(shader: Shader): void {
      if (this._state === ZoneState.UPDATING) {
        this._scene.render(shader);
      }
    }

    public isLoaded(): boolean {
      return this._scene.isLoaded;
    }

    public onActived(): void {

    }

    public onDeActived(): void {

    }

    private loadSimObject(dataSection: any, parent: SimObject): void {
      let name: string;
      if(dataSection.name !== undefined) {
        name = String(dataSection.name);
      }

      this._globalId++;
      let simObject = new SimObject(this._globalId, name, this._scene);

      if(dataSection.transform !== undefined) {
        simObject.transform.setFromJson(dataSection.transform);
      }

      if(dataSection.children !== undefined) {
        for(let o in dataSection.children) {
          let obj = dataSection.children[o];
          this.loadSimObject(obj, simObject); // recursive load all
        }
      }

      if(parent !== undefined) {
        parent.addChild(simObject);
      }
    }
  }
}
