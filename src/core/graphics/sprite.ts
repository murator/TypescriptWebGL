namespace TSE {
  export class Sprite {
    private _width: number;
    private _height: number;
    private _name: string;
    public position: Vector3 = new Vector3(0, 0, 0);

    // a container for data to be pushed to the graphics card
    private _buffer: GLBuffer;

    constructor(name: string, width = 100, height = 100) {
      this._name = name;
      this._width = width;
      this._height = height;
    }

    public load(): void {
      this._buffer = new GLBuffer( 3 );

      const positionAttribute = new AttributeInfo();
      positionAttribute.location = 0; // this._shader.getAttributeLocation( "a_position" );
      positionAttribute.offset = 0;
      positionAttribute.size = 3;
      this._buffer.addAttributeLocation( positionAttribute );

      // x,y,z point in 3d space
      // z axis is always on 0 on a 2d screen
      // Note: webGL almost always works in triangles!
      // So if you want to have a square to put something on the screen, you need 2 triangles!
      // STEP: replace everything on the x axis with this._width
      // STEP: replace everything on the y axis with this._height
      const vertices = [
        0, 0, 0, // 1 - 3 = triangle
        0, this._height, 0,
        this._width, this._height, 0,
        this._width, this._height, 0, // 4 - = inverted triangle, makes a square
        this._width, 0, 0,
        0, 0, 0,
      ];

      this._buffer.pushBackData( vertices );
      this._buffer.upload();
      this._buffer.unbind();
    }

    public update(time: number): void {

    }

    public draw(): void {
      this._buffer.bind();
      this._buffer.draw();
    }

  }
}
