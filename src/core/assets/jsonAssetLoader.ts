namespace TSE {
  export class JsonAsset implements IAsset {
    public name: string;
    public data: any;

    public constructor(name: string, data: any) {
      this.name = name;
      this.data = data;
    }
  }

  export class JsonAssetLoader implements IAssetLoader {
    public get supportedExtensions(): string[] {
      return ['json'];
    }

    public loadAsset(assetName: string): void {
      let request: XMLHttpRequest = new XMLHttpRequest();
      request.open('GET', assetName);
      request.addEventListener('load', TSE.JsonAssetLoader.onJsonLoaded.bind(this, assetName, request));
      request.send();
    }

    private static onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
      console.log('assetName', assetName);
      console.log('request', request);

      if (request.readyState === request.DONE && request.status === 200) {
        console.log('request.responseText', request.responseText);
        const json = JSON.parse(request.responseText);
        const jsonAsset = new JsonAsset(assetName, json);
        AssetManager.onAssetLoaded(jsonAsset);
      }
    }
  }
}
