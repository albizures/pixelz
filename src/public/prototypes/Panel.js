'use strict';
const {createDiv,createSpan} = require('../utils.js');
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001
function createPanel() {
  let params = arguments;
  return (function () {
    let zIndex, name,position,width,height,div,parent,dragBar;
    function Panel(name) {
      this.name = name;
    }
    Panel.prototype = {
      constructor : Panel,
      get name(){return name;},
      set name(val){name = val;},
      get parent(){return parent;},
      set parent(val){parent = val;},
      get div(){return div;},
      set div(val){div = val;}
    };
    Panel.prototype.init = function () {
      if(!hasVal(parent)) return console.error('parent undefined');
      div = document.createElement('div');
      div = createDiv('panel','panel-'+name.toLowerCase());
      dragBar = createDiv('drag-bar');
      dragBar.appendChild(createSpan(name));
      parent.appendChild(div);
      div.appendChild(dragBar);
      if(hasVal(this.mainInit)) this.mainInit();
    };
    return new Panel(params[0]);
  })();
}
module.exports = createPanel;
