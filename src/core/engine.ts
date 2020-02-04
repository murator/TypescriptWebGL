namespace TSE {
  export class Engine {
    private _title = 'WebGL GameEngine';
    private _count = 0;
    private _canvas: HTMLCanvasElement;
    private _shader: Shader;
    private _sprite: Sprite;
    private _projection: Matrix4x4;

    public constructor() {
    }

    public start(): void {
      this._canvas = GLUtilities.initialize();

      gl.clearColor(0, 0, 0, 1);

      this.loadShaders();
      this._shader.use();

      console.log('this._shader', this._shader);

      this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -100.0, 100.0);
      // this.createBuffer();
      // load sprite
      this._sprite = new Sprite('test');
      this._sprite.load();
      this._sprite.position.x = 0;

      this.resize();
      this.loop();
    }

    /**
     * Resizes the canvas to fit the window
     */
    public resize(): void {
      if (this._canvas !== undefined) {
        console.log('this._canvas is there, resize?');
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;

        // This is the full default viewport NDC (Normalized Device Coordinates) coords.
        // The max area of the screen (off screen also), this also guarantees the aspect ratio of the screen
        gl.viewport(-1, 1, 1, -1);
      }
    }

    private loop(): void {
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set uniforms.
      const colorPosition = this._shader.getUniformLocation('u_color');
      gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

      const projectionPosition = this._shader.getUniformLocation('u_projection');
      gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

      const modelLocation = this._shader.getUniformLocation('u_model');
      gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));

      // draw sprite
      this._sprite.draw();

      requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * glsl shader language to be processed by the graphics card
     */
    private loadShaders(): void {
      const vertexShaderSource = `
attribute vec3 a_position;
uniform mat4 u_projection;
uniform mat4 u_model;

void main() {
    gl_Position = u_projection * u_model * vec4(a_position, 1.0);
}`;

      const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;
void main() {
    gl_FragColor = u_color;
}
`;

      this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }
  }
}
