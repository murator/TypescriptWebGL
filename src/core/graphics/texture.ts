namespace TSE {

  const LEVEL: number = 0;
  const BORDER: number = 0;
  const rgbaData = [255, 255, 255, 255];
  const TEMP_IMAGE_DATA: Uint8Array = new Uint8Array(rgbaData);

  export class Texture implements IMessageHandler {
    private _name: string;
    private _textureHandle: WebGLTexture;
    private _isLoaded = false;
    private _width: number;
    private _height: number;

    constructor(name: string, width: number = 1, height: number = 1) {
      this._name = name;
      this._width = width;
      this._height = height;

      this._textureHandle = gl.createTexture();

      Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name, this);

      this.bind();

      // temporary store white texture data so no error is thrown before the real texture is actually loaded
      gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, 1, 1, BORDER, gl.RGBA, gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);

      const asset = AssetManager.getAsset(this.name) as ImageAsset;
      // console.log('Get the asset from the assetmanager', asset);
      if (asset !== undefined) {
        // console.log('Get the texture from the given asset');
        this.loadTextureFormAsset(asset);
      }
    }

    public get name(): string {
      return this._name;
    }

    public get isLoaded(): boolean {
      return this._isLoaded;
    }

    public get width(): number {
      return this._width;
    }

    public get height(): number {
      return this._height;
    }

    public destroy(): void {
      gl.deleteTexture(this._textureHandle); // cleanup if the texture is no longer used
    }

    public bind(): void {
      gl.bindTexture(gl.TEXTURE_2D, this._textureHandle);
    }

    public unbind(): void {
      gl.bindTexture(gl.TEXTURE_2D, undefined);
    }

    public activateAndBind(textureUnit: number = 0): void {
      gl.activeTexture(gl.TEXTURE0 + textureUnit); // what channel to activate the texture on?
      this.bind(); // bind immediately after activating a texture
    }

    public onMessage(message: Message): void {
      // console.log('onMessage', message);
      if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name) {
        // console.log('MATCHED MESSAGE');
        this.loadTextureFormAsset(message.sender as ImageAsset);
      }
    }

    private loadTextureFormAsset(asset: ImageAsset): void {
      this._width = asset.width;
      this._height = asset.height;

      // console.log('asset', asset);

      this.bind();

      gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset.data);
      // texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;

      if (this.isPowerOf2()) {
        gl.generateMipmap(gl.TEXTURE_2D); // texture filtering at a distance
      } else {
        // 1. do not generate a mip map
        // 2. clamp the wrapping to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

      this._isLoaded = true;
    }

    private isPowerOf2(): boolean {
      return this.isValuePowerOf2(this._width) && this.isValuePowerOf2(this._height);
    }

    private isValuePowerOf2(value: number): boolean {
      return (value & (value - 1)) == 0;
    }
  }
}
