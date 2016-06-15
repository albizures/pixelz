
function extend(destination, source) {
	for (let k in source) {
		if (source.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination;
}
module.exports = extend;
