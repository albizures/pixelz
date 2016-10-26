//Returns true if it is a DOM node
// function isNode(obj) {
//   return (
//     typeof Node === "object" ? obj instanceof Node :
//     obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
//   );
// }

//Returns true if it is a DOM element
function isElement(obj) {
  return (
    typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
    obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
  );
}

 // NOTE: code taken from http://stackoverflow.com/a/2947012/4394520 with a littles chages
module.exports = function make(desc) {
  if (!Array.isArray(desc)) {
    return make.call(this, Array.prototype.slice.call(arguments));
  }

  let name = desc[0],
    parent = false,
    attributes = desc[1],

    el = typeof name === 'string' ? document.createElement(name) : name,

    start = 1;
  if (typeof attributes === "object" && attributes !== null && !Array.isArray(attributes) && !isElement(attributes)) {
    for (let attr in attributes) {
      if (attr === 'parent') {
        parent = true;
      } else {
        el[attr] = attributes[attr];
      }

    }
    start = 2;
  }

  for (let i = start; i < desc.length; i++) {
    if (isElement(desc[i])) {
      el.appendChild(desc[i]);
    } else if (Array.isArray(desc[i])) {
      el.appendChild(make(desc[i]));
    } else {
      el.appendChild(document.createTextNode(desc[i]));
    }
  }
  if (parent) {
    attributes.parent.appendChild(el);
  }
  return el;
};
