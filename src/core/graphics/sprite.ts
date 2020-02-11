namespace TSE {
  export class Sprite {
    private _width: number;
    private _height: number;
    private _name: string;

    // A container for data to be pushed to the graphics card
    private _buffer: GLBuffer;
    private _material: Material;
    private _materialName: string;

    // Position of the sprite
    // public position: Vector3 = new Vector3(0, 0, 0);

    /**
     * Creates a new sprite
     * @param name
     * @param materialName
     * @param width
     * @param height
     */
    constructor(name: string, materialName: string, width = 100, height = 100) {
      this._name = name;
      this._width = width;
      this._height = height;
      this._materialName = materialName;
      this._material = MaterialManager.getMaterial(this._materialName);
    }

    public get name() {
      return this._name;
    }

    public destroy(): void {
      this._buffer.destroy();
      MaterialManager.releaseMaterial(this._materialName);
      this._material = undefined;
      this._materialName = undefined;
    }

    public load(): void {
      this._buffer = new GLBuffer(5); // was 3 -> 5 after adding U,V

      const positionAttribute = new AttributeInfo();
      positionAttribute.location = 0; // this._shader.getAttributeLocation( "a_position" );
      positionAttribute.offset = 0;
      positionAttribute.size = 3;
      this._buffer.addAttributeLocation(positionAttribute);

      const texCoordAttribute = new AttributeInfo();
      texCoordAttribute.location = 1;
      texCoordAttribute.offset = 3;
      texCoordAttribute.size = 2;
      this._buffer.addAttributeLocation(texCoordAttribute);

      // x,y,z point in 3d space
      // z axis is always on 0 on a 2d screen
      // Note: webGL almost always works in triangles!
      // So if you want to have a square to put something on the screen, you need 2 triangles!
      // STEP: replace everything on the x axis with this._width
      // STEP: replace everything on the y axis with this._height
      // const vertices = [
      //   0, 0, 0, // 1 - 3 = triangle
      //   0, this._height, 0,
      //   this._width, this._height, 0,
      //   this._width, this._height, 0, // 4 - = inverted triangle, makes a square
      //   this._width, 0, 0,
      //   0, 0, 0,
      // ];
      // STEP: adding U, V to the rows
      const vertices = [
        0, 0, 0, 0, 0, // 1 - 3 = triangle
        0, this._height, 0, 0, 1.0,
        this._width, this._height, 0, 1.0, 1.0,
        this._width, this._height, 0, 1.0, 1.0,  // 4 - = inverted triangle, makes a square
        this._width, 0, 0, 1.0, 0,
        0, 0, 0, 0, 0
      ];

      this._buffer.pushBackData(vertices);
      this._buffer.upload();
      this._buffer.unbind();
    }

    public update(time: number): void {

    }

    public draw(shader: Shader, model: Matrix4x4): void {
      // Set uniforms.
      const modelLocation = shader.getUniformLocation('u_model');
      gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

      const colorLocation = shader.getUniformLocation('u_tint');
      gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

      if (this._material.diffuseTexture !== undefined) {
        this._material.diffuseTexture.activateAndBind(0);
        let diffuseLocation = shader.getUniformLocation('u_diffuse');
        gl.uniform1i(diffuseLocation, 0);
      }

      this._buffer.bind();
      this._buffer.draw();
    }

  }
}
