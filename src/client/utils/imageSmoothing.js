
module.exports = function imageSmoothing(ctx, value) {
	ctx.imageSmoothingEnabled = value;
	ctx.mozImageSmoothingEnabled = value;
	ctx.msImageSmoothingEnabled = value;
};
