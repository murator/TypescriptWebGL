namespace TSE {
  /**
   * WebGL Shader
   */
  export abstract class Shader {
    private readonly _name: string;
    private _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {};
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    /**
     * Creates a new shader
     * @param name The name of the shader
     * @param vertexSrc The source of the VertexShader
     * @param fragmentSrc The source of the FragmentShader
     */
    constructor(name: string) {
      this._name = name;
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
      if (this._program) {
        gl.useProgram(this._program);
      }
    }

    /**
     * Gets the location of an attribute with the provided name.
     * @param name The name of the attribute whose location to retrieve.
     */
    public getAttributeLocation(name: string): number {
      if (this._attributes[name] === undefined) {
        throw new Error(`Unable to find attribute named '${name}' in shader named '${this._name}'`);
      }

      return this._attributes[name];
    }

    /**
     * Gets the location of an uniform with the provided name.
     * @param name The name of the uniform whose location to retrieve.
     */
    public getUniformLocation(name: string): WebGLUniformLocation {
      if (this._uniforms[name] === undefined) {
        throw new Error(`Unable to find uniform named '${name}' in shader named '${this._name}'`);
      }

      return this._uniforms[name];
    }

    protected load(vertexSrc: string, fragmentSrc: string): void {
      console.log('Loading shader', vertexSrc, fragmentSrc);
      const vertexShader = this.loadShader(vertexSrc, gl.VERTEX_SHADER);
      const fragmentShader = this.loadShader(fragmentSrc, gl.FRAGMENT_SHADER);

      this.createProgram(vertexShader, fragmentShader);

      this.detectAttributes();
      this.detectUniforms();
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
      console.log('this._program', this._program);

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

    private detectAttributes(): void {
      const attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < attributeCount; ++i) {
        const info: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);
        if (!info) {
          break;
        }

        this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
      }
    }

    private detectUniforms(): void {
      const uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; ++i) {
        const info: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
        if (!info) {
          break;
        }

        this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
      }
    }
  }
}
