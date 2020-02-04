namespace TSE {
  // Responsible for loading a specific type of asset and populating the asset data
  export interface IAssetLoader {
    readonly supportedExtensions: string[];
    loadAsset(assetName: string): void;
  }
}
