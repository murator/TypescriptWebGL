namespace TSE {
  export const MESSAGE_ASSET_LOADER_ASSET_LOADED = 'MESSAGE_ASSET_LOADER_ASSET_LOADED::';

  export class AssetManager {
    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: { [name: string]: IAsset} = {};

    private constructor() {
    }

    public static initialize(): void {
      console.log('AssetManager initialize');
      AssetManager._loaders.push(new ImageAssetLoader());
      AssetManager._loaders.push(new JsonAssetLoader());
    }

    public static registerLoader(loader: IAssetLoader): void {
      AssetManager._loaders.push(loader);
    }

    public static onAssetLoaded(asset: IAsset): void {
      console.log('onAssetLoaded', asset);
      AssetManager._loadedAssets[asset.name] = asset;
      Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
    }

    public static loadAsset(assetName: string): void {
      const extension = assetName.split('.').pop().toLocaleLowerCase();
      for (let l of AssetManager._loaders) {
        if (l.supportedExtensions.indexOf(extension) !== -1) {
          l.loadAsset(assetName);
          return;
        }
      }

      console.log('Unable to load asset with extension' + extension + ', no loader available');
    }

    public static isAssetLoaded(assetName: string): boolean {
      // console.log('isAssetLoaded', assetName);
      return AssetManager._loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName: string): IAsset {
      // console.log('assetName', assetName);
      // return the asset if it was loaded, otherwise load the asset and return undefined
      if(AssetManager._loadedAssets[assetName] !== undefined) {
        // console.log('getAsset already loaded');
        return AssetManager._loadedAssets[assetName];
      } else {
        // console.log('getAsset loading the asset');
        AssetManager.loadAsset(assetName);
      }

      return undefined;
    }
  }
}
