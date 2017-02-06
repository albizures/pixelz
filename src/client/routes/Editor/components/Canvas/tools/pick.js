import Tool from './Tool';
import { calculatePosition, validCord, getColorPixel } from 'utils/canvas';

const obj = {};
// let lastPixel;

obj.onMouseDown = function (evt) {
  if (evt.target.nodeName !== 'CANVAS') return;
  let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
  if (!validCord(this.layer, newPixel)) return;
  newPixel.color = getColorPixel(this.layer, newPixel);
  if (evt.which === this.RIGHT_CLICK) {
    this.setSecudaryColor(newPixel.color);
  } else {
    this.setPrimaryColor(newPixel.color);
  }
};

const pencil = Tool.create('pick', obj);

export default pencil;
