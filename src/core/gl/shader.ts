namespace TSE {
  /**
   * WebGL Shader
   */
  export class Shader {
    private readonly _name: string;
    private _program: WebGLProgram | null | undefined;

    /**
     * Creates a new shader
     * @param name The name of the shader
     * @param vertexSrc The source of the VertexShader
     * @param fragmentSrc The source of the FragmentShader
     */
    constructor(name: string, vertexSrc: string, fragmentSrc: string) {
      this._name = name;
      const vertexShader = this.loadShader(vertexSrc, gl.VERTEX_SHADER);
      const fragmentShader = this.loadShader(fragmentSrc, gl.FRAGMENT_SHADER);

      this.createProgram(vertexShader, fragmentShader);
    }

    /**
     * Name of the shader
     */
    public get name(): string {
      return this._name;
    }

    /**
     * Use a specified shader
     */
    public use(): void {
      if(this._program) {
        gl.useProgram(this._program);
      }
    }

    /**
     * Create and compile a shader of specified src and type
     * @param src
     * @param shaderType
     */
    private loadShader(src: string, shaderType: number): WebGLShader {
      // TODO: describe different shader types
      const shader: WebGLShader | null = gl.createShader(shaderType);
      if (shader) {
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        const error = gl.getShaderInfoLog(shader);
        if (error !== '') {
          throw new Error('Cannot compile shader' + this.name + error);
        }
        return shader;
      }
      throw new Error('Cannot create shader' + this.name);
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
      this._program = gl.createProgram();

      if (this._program) {
        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);
        gl.linkProgram(this._program);
        const error = gl.getProgramInfoLog(this._program);
        if (error !== '') {
          throw new Error('Error linking shader program ' + this.name + error);
        }
      }
    }
  }
}
