namespace TSE {
  export class BaseComponent implements IComponent{
    protected _owner: SimObject;
    protected _data: IComponentData;

    public name: string;

    constructor(data: IComponentData) {
      this._data = data;
    }

    public setOwner(owner: SimObject): void {
      this._owner = owner;
    }

    public get owner(): SimObject {
      return this._owner;
    }

    public load(): void {

    }

    public update(time: number): void {

    }

    public render(shader: Shader): void {

    }
  }
}
