'use strict';
const colors = ['255.0.255', '0.255.0', '255.255.0', '0.255.255'];


module.exports =  function (usedColors) {

	for (let i = 0; i < colors.length; i++) {
		if (!usedColors[colors[i]]) {
			let components = colors[i].split('.');
			return {r : components[0], g : components[1], b : components[2]};
		}
	}

	for (let r = 0; r < 255; r++) {
		for (let g = 0; g < 255; g++) {
			for (let b = 0; b < 255; b++) {
				if (!usedColors[r + '.' + g + '.' + b]) {
					return {r : r, g : g, b : b};
				}
			}
		}
	}
};
