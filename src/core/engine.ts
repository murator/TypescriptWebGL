namespace TSE {
  export class Engine {
    private _title = 'WebGL GameEngine';
    private _count = 0;
    private _canvas: HTMLCanvasElement | undefined;
    private _shader: Shader | undefined;

    public constructor() {
    }

    public start(): void {
      this._canvas = GlUtilities.initialize('canvas');
      gl?.clearColor(0, 0, 0, 1);
      this.loadShaders();
      this._shader?.use();
      this.loop();
    }

    /**
     * Resizes the canvas to fit the window
     */
    public resize(): void {
      if (this._canvas !== undefined) {
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;
      }
    }

    private loop(): void {
      this._count++;
      gl?.clear(gl?.COLOR_BUFFER_BIT);
      document.title = this._title + ' - ' + this._count.toString();
      requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * glsl shader language to be processed by the graphics card
     */
    private loadShaders(): void {
      const vertexShaderSource = `
attribute vec3 a_position;
void main() {
  gl_Position  = vec4(a_position, 1.0);
}
      `;

      const fragmentShaderSource = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
      `;

      this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }
  }
}
