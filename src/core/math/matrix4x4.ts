namespace TSE {

  /**
   *  everything in wegGl is in 3d
   *  a projection matrix functions as the eye or camera as point in space
   *  near clipping plane and far clipping plane
   *  the near clipping plane is the least amount of distance close to the eye that makes sence to render
   *  the far clipping plane the most far away
   *  an object sitting between these two planes in 3d is translated into 2d by those two planes (perspective)
   *  everything outside that is not rendered at all
   *  a matrix is a two dimensional array (columns, rows)
   */
  export class Matrix4x4 {
    private _data: number[] = [];

    private constructor() {

      // identity matrix, the default version
      this._data = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }

    public get data(): number[] {
      return this._data;
    }

    // Use a static method to return the default with a direct call
    public static identity(): Matrix4x4 {
      return new Matrix4x4();
    }

    // An orthographic projection matrix renders everything as if it flat in space
    // It allows you to see exactly where points fall in the world on the x and y axis without perspective
    public static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4 {
      const m = new Matrix4x4();
      const lr: number = 1.0 / (left - right);
      const bt: number = 1.0 / (bottom - top);
      const nf: number = 1.0 / (nearClip - farClip);

      // Translate the 1's in the first 3 rows
      m._data[0] = -2.0 * lr;
      m._data[5] = -2.0 * bt;
      m._data[10] = 2.0 * nf;

      // Translate all elements except the last 1 in the last row
      m._data[12] = (left + right) * lr;
      m._data[13] = (top + bottom) * bt;
      m._data[14] = (farClip + nearClip) * nf;

      return m;
    }

    // A representation of movement in space
    public static translation(position: Vector3): Matrix4x4 {
      const m = new Matrix4x4();

      m._data[12] =  position.x;
      m._data[13] =  position.y;
      m._data[14] =  position.z;

      return m;
    }
  }
}
