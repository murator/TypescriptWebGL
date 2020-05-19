namespace TSE {
  export class SpriteComponentData implements IComponentData{
    public name: string;
    public materialName: string;

    public setFromJson(json: any): void {
      if(json.name !== undefined) {
        this.name = json.name;
      }
      if(json.materialName !== undefined) {
        this.materialName = json.materialName;
      }
    }
  }

  export class SpriteComponentBuilder implements IComponentBuilder {
    readonly type: string;

    buildFromJson(json: any): void {
    }

  }

  export class SpriteComponent extends BaseComponent {
    private _sprite: Sprite;
    private _data: SpriteComponentData;

    constructor(name: string, materialName: string) {
      super(name);

      this._sprite = new Sprite(name, materialName);
    }

    public load(): void {
      this._sprite.load();
    }

    public render(shader: Shader): void {
      this._sprite.draw(shader, this.owner.worldMatrix);
      super.render(shader);
    }
  }
}
