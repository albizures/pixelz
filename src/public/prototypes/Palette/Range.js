const AppendObject = require('../../prototypes/AppendObject.js');
const {inheritanceObject,createSpan,createInputRange} = require('../../utils.js');
function Range(value,min,max,type,callback) {
  this.value = value,
  this.max = max;
  this.min = min;
  this.type = type;
  this.el = document.createElement('div');
  this.input = createInputRange(0,this.min,this.max);
  this.spanName = createSpan(this.type);
  this.spanValue = createSpan(this.value);
  this.callback = callback;
  $(this.input).on('input.range' + this.type,this.onChange.bind(this) );
  this.el.appendChild(this.spanName);
  this.el.appendChild(this.input);
  this.el.appendChild(this.spanValue);
}
inheritanceObject(Range,AppendObject);
Range.prototype.onChange = function () {
  this.spanValue.textContent = this.value = this.input.value;
  if(this.callback) this.callback(this.type,this.value);
};
console.log(Range.prototype);
module.exports = Range;
