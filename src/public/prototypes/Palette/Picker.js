const Range = require('./Range.js');
const AppendObject = require('../../prototypes/AppendObject.js');
const {inheritanceObject} = require('../../utils.js');
function Picker(name,callback) {
  this.name = name + 'Picker';
  this.types = Array.prototype.slice.call(arguments,2);
  this.el = document.createElement('div');
  for (let i = 0; i < this.types.length; i++) {
    let newRange = new Range(0,0,255,this.types[i],callback.bind(this));
    newRange.appendTo(this.el);
    this['range' + this.types[i]] = newRange;
  }
}
inheritanceObject(Picker,AppendObject);
module.exports = Picker;
