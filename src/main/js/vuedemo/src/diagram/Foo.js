const Foo = function () {
};

Foo.prototype = Polyline.prototype;

Polygone.prototype = new Foo();

Polygone.prototype.rebuildPath = function () {
  const path = [];
  for (let i = 0; i < this.getAnchorsCount(); i++) {
    const anchor = this.getAnchor(i);
    let pathType = '';
    if (i === 0)
      pathType = 'M';
    else
      pathType = 'L';
    let targetX = anchor.x, targetY = anchor.y;
    // anti smoothing
    if (this.strokeWidth % 2 === 1) {
      targetX += 0.5;
      targetY += 0.5;
    }
    path.push([pathType, targetX, targetY]);
  }
  if (this.closePath)
    path.push(['Z']);
  this.path = path;
};
