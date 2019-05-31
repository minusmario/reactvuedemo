const ANCHOR_TYPE = {
  main: 'main',
  middle: 'middle',
  first: 'first',
  last: 'last',
};

const Anchor = function (uuid, type, x, y) {
  this.uuid = uuid;
  this.x = x;
  this.y = y;
  this.type = (type === ANCHOR_TYPE.middle) ?
    ANCHOR_TYPE.middle :
    ANCHOR_TYPE.main;
};

Anchor.prototype = {
  uuid: null,
  x: 0,
  y: 0,
  type: ANCHOR_TYPE.main,
  isFirst: false,
  isLast: false,
  index: 0,
  typeIndex: 0,
};

