namespace TSE {
  export class Engine {
    private _title = 'WebGL GameEngine';
    private _count = 0;
    private _canvas: HTMLCanvasElement | undefined;

    public constructor() {
    }

    public start(): void {
      this._canvas = GlUtilities.initialize('canvas');
      gl?.clearColor(0, 0, 0, 1);

      this.loop();
    }

    private loop(): void {
      this._count++;
      gl?.clear(gl?.COLOR_BUFFER_BIT);
      document.title = this._title + ' - ' + this._count.toString();
      requestAnimationFrame(this.loop.bind(this));
    }
  }
}
