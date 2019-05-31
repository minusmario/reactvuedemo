import ANCHOR_TYPE from './Anchor-type';

export default function Anchor(uuid, type, x, y) {
  this.uuid = uuid;
  this.x = x;
  this.y = y;
  this.type = (type === ANCHOR_TYPE.middle) ?
    ANCHOR_TYPE.middle :
    ANCHOR_TYPE.main;
}
