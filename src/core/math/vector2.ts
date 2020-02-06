namespace TSE {
  /**
   * Used for UV mapping on a surface.
   * UV coords are (where the square is two triangles):
   * 0.1      1.1
   *
   *
   *
   * 0.0      1.0
   */
  export class Vector2 {

    private _x: number;
    private _y: number;

    public constructor(x: number = 0, y: number = 0) {
      this._x = x;
      this._y = y;
    }

    public get x(): number {
      return this._x;
    }

    public set x(val: number) {
      this._x = val;
    }

    public get y(): number {
      return this._y;
    }

    public set y(val) {
      this._y = val;
    }

    public toArray(): number[] {
      return [this._x, this._y];
    }

    public toFloat32Array(): Float32Array {
      return new Float32Array(this.toArray());
    }

  }
}
