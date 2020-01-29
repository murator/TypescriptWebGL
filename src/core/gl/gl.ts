namespace TSE {
  /**
   * WebGl rendering context
   */
  export let gl: WebGLRenderingContext;

  /**
   * Setup webgl rendering context
   */
  export class GlUtilities {

    /**
     * Initialized webgl, using elementId as canvas
     * @param elementId
     */
    public static initialize(elementId?: string): HTMLCanvasElement {
      let canvas: HTMLCanvasElement;
      if (elementId !== undefined) {
        canvas = document.getElementById(elementId) as HTMLCanvasElement;
        if (canvas === undefined) {
          throw new Error('Cannot find a canvas element names ' + elementId);
        }
      } else {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
      }

      // @ts-ignore
      gl = canvas.getContext('webgl');
      if(gl === undefined) {
        throw new Error('Unable to initialze webgl');
      }

      return canvas;
    }
  }
}
