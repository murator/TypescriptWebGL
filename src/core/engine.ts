namespace TSE {
  export class Engine {
    private _title = 'WebGL GameEngine';
    private _count = 0;
    private _canvas: HTMLCanvasElement;
    private _basicShader: BasicShader;
    private _sprite: Sprite;
    private _projection: Matrix4x4;

    public constructor() {
    }

    public start(): void {
      this._canvas = GLUtilities.initialize();
      AssetManager.initialize();

      gl.clearColor(0, 0, 0, 1);

      this._basicShader = new BasicShader();
      this._basicShader.use();

      // Load materials
      MaterialManager.registerMaterial(new Material('concrete', 'assets/textures/concrete.jpg', new Color(12, 128, 0, 255)));

      this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);

      this._sprite = new Sprite('test', 'concrete');
      this._sprite.load();
      this._sprite.position.x = 400;
      this._sprite.position.y = 100;

      console.log('this._sprite', this._sprite);

      this.resize();
      this.loop();
    }

    /**
     * Resizes the canvas to fit the window
     */
    public resize(): void {
      if (this._canvas !== undefined) {
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;

        // This is the full default viewport NDC (Normalized Device Coordinates) coords.
        // The max area of the screen (off screen also), this also guarantees the aspect ratio of the screen
        gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);
      }
    }

    private loop(): void {
      MessageBus.update(0);

      gl.clear(gl.COLOR_BUFFER_BIT);

      const projectionPosition = this._basicShader.getUniformLocation('u_projection');
      gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

      // draw sprite
      this._sprite.draw(this._basicShader);

      requestAnimationFrame(this.loop.bind(this));
    }
  }
}
