namespace TSE {
  export class ImageAsset implements IAsset {
    public name: string;
    public data: HTMLImageElement;

    public constructor(name: string, data: HTMLImageElement) {
      // console.log('name', name);
      // console.log('data', data);
      this.name = name;
      this.data = data;
    }

    public get width() {
      return this.data.width;
    }
    public get height() {
      return this.data.height;
    }
  }

  export class ImageAssetLoader implements IAssetLoader {
    public get supportedExtensions(): string[] {
      return ['png', 'gif', 'jpg'];
    }

    public loadAsset(assetName: string): void {
      let image: HTMLImageElement = new Image();
      image.onload = this.onImageLoaded.bind(this, assetName, image);
      image.src = assetName;
      // console.log('loadAsset', image);
    }

    private onImageLoaded(assetName: string, image: HTMLImageElement): void {
      // console.log('onImageLoaded', assetName, image);
      let asset = new ImageAsset(assetName, image);
      AssetManager.onAssetLoaded(asset);
    }
  }
}
