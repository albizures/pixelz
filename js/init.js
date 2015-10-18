console.time('canvas');
const HEIGHT_DEF = 20,
			WIDTH_DEF = 20,
			SCALE_DEF = 22,
			SIZE_POINTER_DEF = 1,
			COLOR_POINTER_PREW_DEF = 'rgba(255,255,255,0.2)';

document.getById =  document.getElementById
window._events = {};
window.on = function (name,handler) {
	HTMLElement.prototype.on.call(this,name,handler);
}
window.off = function (name) {
	HTMLElement.prototype.off.call(this,name);
}

HTMLElement.prototype.on = function (name,handler) {
	if(!hasVal(this._events)){
		Object.defineProperty(this, '_events', {
			value : {},
			enumerable : false
		});
	}
	var suffix = name.split('.')[1];
 	name = name.split('.')[0];
	if(!hasVal(suffix)) return console.error('Event error name');
	if(!hasVal(this._events[name])) this._events[name] = {};
	if(!hasVal(this._events[name][suffix])){
		this._events[name][suffix] =  handler.bind(this);
		this.addEventListener(name,this._events[name][suffix]);
		return this;
	}else{
		console.error('Event wrong name');
	}
};
HTMLElement.prototype.off = function (name) {
	console.log(name);
	var suffix = name.split('.')[1];
 	name = name.split('.')[0];

	if(!hasVal(suffix)){
		this.removeEventListener(name);
	}else if(hasVal(this._events[name]) && hasVal(this._events[name][suffix])){
		this.removeEventListener(name,this._events[name][suffix]);
		delete this._events[name][suffix];
	}
	return this;
};
