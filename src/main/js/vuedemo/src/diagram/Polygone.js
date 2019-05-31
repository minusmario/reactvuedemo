const Polygone = function (points, strokeWidth) {
  this.points = points;
  this.path = [];
  this.anchors = [];
  if (strokeWidth) this.strokeWidth = strokeWidth;
  this.closePath = true;
  this.init();
};
