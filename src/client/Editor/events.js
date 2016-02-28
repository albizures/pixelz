'use strict';
module.exports = {
	// _events : {},
	// on (name, handler, that) {
	// 	var suffix = name.split('.')[1];
	// 	name = name.split('.')[0];
	// 	if (!hasVal(suffix)) {
	// 		return console.error('Event error name');
	// 	}
	// 	if (!hasVal(this._events[name])) {
	// 		this._events[name] = {};
	// 	}
	// 	if (!hasVal(this._events[name][suffix])) {
	// 		this._events[name][suffix] = hasVal(that) ? handler.bind(that) : handler;
	// 		return this;
	// 	}else {
	// 		console.error('Event wrong name');
	// 	}
	// },
	// off () {
	// 	// TODO: make off of events
	// },
	// fire (name, val) {
	// 	let suffix = name.split('.')[1];
	// 	if (arguments.length > 2) {
	// 		val = Array.prototype.slice.call(arguments, 1);
	// 	}else if (arguments.length == 2) {
	// 		val = [val];
	// 	}
	// 	name = name.split('.')[0];
	// 	if (!hasVal(suffix) && hasVal(this._events[name])) {
	// 		// TODO: Change for a Object.keys
	// 		for (let i in this._events[name]) {
	// 			this._events[name][i](...val);
	// 		}
	// 	}else if (hasVal(this._events[name]) && hasVal(this._events[name][suffix])) {
	// 		this._events[name][suffix](...val);
	// 	}
	// }
};
