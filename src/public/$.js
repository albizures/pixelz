'use strict';
const Selector = require("./prototypes/Selector.js")
function createProp(name,ob,val) {
	if(hasVal(ob[name])) return;
	Object.defineProperty(ob, name, {
		value : val,
		enumerable : false
	});
}
const $ = function () {
	if(arguments.length === 0) return;
	if(arguments[0] instanceof Selector) return arguments[0];
	let params = arguments;
	if(params[0] instanceof Element || params[0] === window){
		return new Selector(params[0]);
	}else if(typeof params[0] === 'string'){
		let selector = params[0].trim();
		let element
		let simple = true;
		simple == selector.indexOf(' ') !== -1 && simple;
		simple == selector.split('.').length > 1 && simple;
		simple == selector.indexOf('>') !== -1 && simple;
		simple == selector.indexOf(',') !== -1 && simple;

		if(simple){
			if(selector.indexOf('#') !== -1){
				element = document.getElementById(selector.replace('#',''));
			}else if(selector.indexOf('.') !== -1){
				element = document.getElementsByClassName(selector.replace('.',''));
				console.log(element,selector);
			}
		}else{

		}
		return new Selector(element);
	}
}
module.exports = $;
