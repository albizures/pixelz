
var imageSmoothing = function (ctx,value){
  ctx.imageSmoothingEnabled = value;
  ctx.mozImageSmoothingEnabled = value;
  ctx.webkitImageSmoothingEnabled = value;
  ctx.msImageSmoothingEnabled = value;
};
module.exports = {
  imageSmoothing : imageSmoothing,
  imageSmoothingDisabled(ctx){
    imageSmoothing(ctx,false);
  }
};
module.exports.colors = require('./colors.js');
