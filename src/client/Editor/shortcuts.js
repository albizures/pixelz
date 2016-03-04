'use strict';

let shortcuts = {
	90 : {
		def : '',
		ctrl : 'undo'
	},
	89 : {
		def : '',
		ctrl : 'redo'
	}
};

module.exports = {
	init : function () {
		$(window).on('keydown.shortcuts', this.onKeydown.bind(this));
		$(window).on('keyup.shortcuts', this.onKeyup.bind(this));
	},
	onKeydown : function (evt) {
		let key = evt.keyCode ? evt.keyCode :  evt.which;
		console.log(evt.ctrlKey,evt.code);
		// console.log('code', evt.code);
		// console.log('key', evt.key);
		// console.log('keyCode', evt.keyCode);
		// console.log('which', evt.which);
		// console.log('charCode', evt.charCode);
	},
	onKeyup : function (evt) {

	}
};
