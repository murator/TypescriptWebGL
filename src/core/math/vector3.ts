namespace TSE {
  export class Vector3 {

    // store the positional data that is used in the shader
    private _x: number;
    private _y: number;
    private _z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
      this._x = x;
      this._y = y;
      this._z = z;
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

    public get z(): number {
      return this._z;
    }

    public set z(val) {
      this._z = val;
    }

    public toArray(): number[] {
      return [this._x, this._y, this._z];
    }

    public toFloat32Array(): Float32Array {
      return new Float32Array(this.toArray());
    }

  }
}