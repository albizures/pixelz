'use strict';
const Tool = require('../prototypes/Tool.js');
const Vector = require('../prototypes/Vector.js');
let lastP;
let pencil = Tool('pencil');
pencil.onClick = function () {
  //console.log('click');
};
pencil.onMouseDown = function (evt) {
  if(evt.target.nodeName == 'CANVAS'){
    pencil.clicked = true;
  }
};
pencil.onMouseMove = function (evt) {

  if(pencil.clicked){
    //console.log('tool,mousemove');

    let positions = pencil.canvas.calculatePosition(new Vector(evt.clientX,evt.clientY ));
    positions.color = Editor.palette.getMainColor();
    if(positions.out && this.stroke.length == 0) return;
    if(positions.out && this.stroke.length > 1 && this.stroke[this.stroke.length - 1].out){return;}
    if(this.stroke.length !== 0 && this.stroke[this.stroke.length - 1].frame.importantDiff(positions.frame)){
      this.getLineBetween(this.stroke[this.stroke.length - 1],positions);
    }else{
      //pencil.canvas.drawAt(cord.relX,cord.relY);
    }
    pencil.canvas.previewAt(positions.paint,positions.color);
    this.addPointStroke(positions);
  }
};
pencil.onMouseLeave = function (evt) {
  // if(pencil.clicked){
  // 	pencil.clicked = false;
  // 	let cord = pencil.canvas.calcPos(evt.clientX,evt.clientY - 30);
  // 	console.log(cord);
  // 	let newP = Vector(cord.relX,cord.relY);
  // 	if(hasVal(lastP) && lastP.importantDiff(newP)){
  // 		pencil.getLine(lastP,newP);
  // 	}else{
  // 		pencil.canvas.drawAt(cord.relX,cord.relY);
  // 	}
  // }
  // lastP = undefined;
};
pencil.onMouseUp = function (evt) {
  if(pencil.clicked){
    let positions = pencil.canvas.calculatePosition( new Vector (evt.clientX,evt.clientY));
    positions.color = Editor.palette.getMainColor();
    if(!positions.out){
      this.addPointStroke(positions);
    }
    pencil.canvas.artboard.frame.paintStroke(this.cleanStroke());
    pencil.clicked = false;
  }
};
module.exports = () => Editor.addTool(pencil);
