'use strict';
function Selector() {
	if(arguments.length === 1 && arguments[0] && arguments[0].length){
		for (let i = 0; i < arguments[0].length; i++) {
			if(hasVal(arguments[0][i]))
				this.push(arguments[0][i]);
		}
	}else{
		for (let i = 0; i < arguments.length; i++) {
			if(hasVal(arguments[i]))
				this.push(arguments[i]);
		}
	}
}
function dimensions() {
	let prop = arguments[0],
		val = arguments[1],
		suffix = window === this[0]? 'inner' : 'offset'
	if(hasVal(val)){
		if(typeof arguments[0] === 'number' ){
			let dim = arguments[1] || 'px';
			for (let i = 0; i < this.length; i++) {
				this[i].style.width = arguments[0] + dim;
			}
		}
	}else{
		return this[0][suffix+prop];
	}
}
Selector.prototype = Object.create(Array.prototype);
Selector.prototype.width = function () {
	return dimensions.bind(this)('Width',arguments[0]);
};
Selector.prototype.height = function () {
	return dimensions.bind(this)('Height',arguments[0]);
};
Selector.prototype.on = function (name,handler) {

	var suffix = name.split('.')[1];
	name = name.split('.')[0];
	for (let i = 0; i < this.length; i++) {
		if(!hasVal(this[i]._events)){
			Object.defineProperty(this[i], '_events', {
				value : {},
				enumerable : false
			});
		}
		if(!hasVal(suffix)) return console.error('Event error name');
		if(!hasVal(this[i]._events[name])) this[i]._events[name] = {};
		if(!hasVal(this[i]._events[name][suffix])){
			this[i]._events[name][suffix] =  handler.bind(this[i]);
			this[i].addEventListener(name,this[i]._events[name][suffix]);
		}else{
			console.error('Event wrong name');
		}
	}
	return this;
}
Selector.prototype.off = function (name) {
	var suffix = name.split('.')[1];
	name = name.split('.')[0];
	for (let i = 0; i < this.length; i++) {
		if(!hasVal(suffix)){
			if(hasVal(this[i]._events[name])){
				for(let i in this[i]._events[name]){
					this[i].removeEventListener(name,this[i]._events[name][i]);
				}
				delete this[i]._events[name];
			}else{
				for(let i in this[i]._events){
					if(hasVal(this[i]._events[i][name])){
						this[i].removeEventListener(i,this[i]._events[i][name]);
						delete this[i]._events[i][name];
					}
				}
			}
		}else if(hasVal(this._events[name]) && hasVal(this._events[name][suffix])){
			this.removeEventListener(name,this._events[name][suffix]);
			delete this._events[name][suffix];
		}
	}
	return this;
}
Selector.prototype.append = function (child) {
	for (let i = 0; i < this.length; i++) {
		if(child instanceof Element){
			this[i].appendChild(child);
		}else{
			for (let a = 0; a < child.length; a++) {
				if(child[a] instanceof Element){
					this[i].appendChild(child[a])
				}
			}
		}
	}
	return this;
}
module.exports = Selector;