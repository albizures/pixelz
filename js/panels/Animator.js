(function () {
	'use strict';
	let preview, time = 0.5 * 1000,loop,index = 0,ctx;
	let Animator = new Panel('Animator');
	Animator.mainInit = function () {
		let perc;

		preview = document.createElement('canvas');
		preview.id = 'preview-animate';
		ctx = preview.getContext('2d');
		if(Editor.sprite.width > Editor.sprite.height){
			perc = $(this.div).width() / Editor.sprite.width;

		}else{
			perc = $(this.div).height() / Editor.sprite.height;
		}
		preview.width =  Editor.sprite.width * perc;
		preview.height =  Editor.sprite.height * perc;
		preview.style.marginTop = (($(this.div).height() - preview.height) / 2) + 'px';
		preview.style.marginLeft = (($(this.div).width() - preview.width) / 2) + 'px';
		console.log(preview.style.marginTop);
		this.div.appendChild(preview);
		loop = setInterval(function () {
			Animator.loop()
		},time);
	}
	Animator.loop = function () {
		if(index == Editor.sprite.frames.length - 1) index = -1;
		index++;
		this.clean();
		ctx.drawImage(Editor.sprite.frames[index].getIMG(),0,0,preview.width,preview.height);
	}
	Animator.clean = function () {
		preview.height = preview.height;
	}
	Editor.addPanel(Animator);
})();
