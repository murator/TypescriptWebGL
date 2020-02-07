namespace TSE {
  export class Transform {
    public position: Vector3 = Vector3.zero;
    public rotation: Vector3 = Vector3.zero;
    public scale: Vector3 = Vector3.one; // default 1 is no scale

    public copyFrom(transform: Transform): void {
      this.position.copyFrom(transform.position);
      this.rotation.copyFrom(transform.position);
      this.scale.copyFrom(transform.position);
    }

    public getTransformationMatrix(): Matrix4x4 {
      const translation = TSE.Matrix4x4.translation(this.position);
      // TODO: Add x and y for 3d
      const rotation = TSE.Matrix4x4.rotationZ(this.rotation.z);
      const scale = TSE.Matrix4x4.scale(this.scale);
      // T * R * S
      return Matrix4x4.multiply(Matrix4x4.multiply(translation, rotation), scale);
    }
  }
}
