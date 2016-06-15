/*
	Julian Descottes (origianl version - https://github.com/juliandescottes/gif.js)
*/

function getPaletteKey(r, g, b) {
	return [r, g, b].join('.');
}

function SimpleQuant(pixels, sample, transparent) {
	this.pixels = pixels;
	this.palette = [];
	this.paletteIndex = {};
	this.transparent = transparent;
	console.info(this.transparent);
}
SimpleQuant.prototype.getColormap = function () {
	return this.palette;
};
SimpleQuant.prototype.buildColormap = function () {
	let npixels = this.pixels.length / 3,
		k = 0;
	for (let i = 0; i < npixels; i++) {
		let r = this.pixels[k++],
			g = this.pixels[k++],
			b = this.pixels[k++];
		this.addColorToPalette(r, g, b);
	}

	if (this.transparent) {
		this.addColorToPalette(this.transparent.r, this.transparent.g, this.transparent.b);
	}
};

SimpleQuant.prototype.addColorToPalette = function (r, g, b) {
	let key = getPaletteKey(r, g, b);
	if (!this.paletteIndex.hasOwnProperty(key)) {
		this.palette.push(r);
		this.palette.push(g);
		this.palette.push(b);
		this.paletteIndex[key] = (this.palette.length / 3) - 1;
	}
};

SimpleQuant.prototype.lookupRGB = function (r, g, b) {
	return this.paletteIndex[getPaletteKey(r, g, b)];
};

module.exports = SimpleQuant;
