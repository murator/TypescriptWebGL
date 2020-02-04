namespace TSE {
  export class Engine {
    private _title = 'WebGL GameEngine';
    private _count = 0;
    private _canvas: HTMLCanvasElement;
    private _shader: Shader;
    private _buffer: GLBuffer; // a container for data to be pushed to the graphics carcd

    public constructor() {
    }

    public start(): void {
      this._canvas = GLUtilities.initialize();

      gl.clearColor(0, 0, 0, 1);

      this.loadShaders();
      this._shader.use();

      console.log('this._shader', this._shader);

      this.createBuffer();

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

        gl.viewport( 0, 0, window.innerWidth, window.innerHeight );
      }
    }

    private loop(): void {
      gl.clear( gl.COLOR_BUFFER_BIT );

      // Set uniforms.
      const colorPosition = this._shader.getUniformLocation( "u_color" );
      gl.uniform4f( colorPosition, 1, 0.5, 0, 1 );

      this._buffer.bind();
      this._buffer.draw();

      requestAnimationFrame( this.loop.bind( this ) );
    }

    private createBuffer(): void {
      this._buffer = new GLBuffer( 3 );

      const positionAttribute = new AttributeInfo();
      positionAttribute.location = this._shader.getAttributeLocation( "a_position" );
      positionAttribute.offset = 0;
      positionAttribute.size = 3;
      this._buffer.addAttributeLocation( positionAttribute );

      // x,y,z point in 3d space
      // z axis is always on 0 on a 2d screen
      const vertices = [
        0, 0, 0,
        0, 0.5, 0,
        0.5, 0.5, 0
      ];

      this._buffer.pushBackData( vertices );
      this._buffer.upload();
      this._buffer.unbind();
    }

    /**
     * glsl shader language to be processed by the graphics card
     */
    private loadShaders(): void {
      const vertexShaderSource = `
attribute vec3 a_position;
void main() {
    gl_Position = vec4(a_position, 1.0);
}`;

      const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;
void main() {
    gl_FragColor = u_color;
}
`;

      this._shader = new Shader( "basic", vertexShaderSource, fragmentShaderSource );
    }
  }
}
