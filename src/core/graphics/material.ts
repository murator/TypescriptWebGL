namespace TSE {
  export class Material {
    private _name: string;
    private _diffuseTextureName: string;
    private _diffuseTexture: Texture;
    private _tint: Color;

    constructor(name: string, diffuseTextureName: string, tint: Color) {
      this._name = name;
      this._diffuseTextureName = diffuseTextureName;
      this._tint = tint;

      if (this._diffuseTextureName !== undefined) {
        TextureManager.releaseTexture(this._diffuseTextureName);
      }
    }

    get name(): string {
      return this._name;
    }

    get diffuseTextureName(): string {
      return this._diffuseTextureName;
    }

    /**
     * If we change the diffuseTextureName it will automatically grab the texture
     * @param diffuseTextureName
     */
    set diffuseTextureName(diffuseTextureName: string) {
      if (this._diffuseTexture !== undefined) {
        TextureManager.releaseTexture(this._diffuseTextureName);
      }
      this._diffuseTextureName = diffuseTextureName;
      if (this._diffuseTextureName !== undefined) {
        this._diffuseTexture = TextureManager.getTexture(diffuseTextureName);
      }
    }

    get tint(): Color {
      return this._tint;
    }

    public destroy(): void {
      TextureManager.releaseTexture(this.diffuseTextureName);
      this._diffuseTexture = undefined;
    }
  }
}
