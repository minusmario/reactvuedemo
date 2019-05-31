export default function Polyline(uuid, points, strokeWidth, paper) {
  this.points = points;
  this.path = [];
  this.anchors = [];
  if (strokeWidth) this.strokeWidth = strokeWidth;
  this.paper = paper;
  this.closePath = false;
  this.init();
}
