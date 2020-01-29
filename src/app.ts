let engine: TSE.Engine;
window.onload = function (): void {
  engine = new TSE.Engine();
  engine.start();
};

window.onresize = function(): void {
  engine.resize();
};
