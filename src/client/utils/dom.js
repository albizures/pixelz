const Selector = require('../Editor/prototypes/Selector.js');
const AppendObject = require('../Editor/prototypes/AppendObject.js');

//Returns true if it is a DOM node
exports.isNode = function (o) {
  return (
    typeof Node === "object" ? o instanceof Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
  );
};

//Returns true if it is a DOM element
exports.isElement = function (o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
};

// function createProp(name, ob, val) {
//   if (hasVal(ob[name])) {
//     return;
//   }
//   Object.defineProperty(ob, name, {
//     value: val,
//     enumerable: false
//   });
// }
let $ = function () {
  if (arguments.length === 0) {
    return;
  }
  if (arguments[0] instanceof Selector) {
    return arguments[0];
  }
  let params = arguments;
  if (params[0] instanceof Element || params[0] === window) {
    return new Selector(params[0]);
  } else if (params[0] instanceof AppendObject) {
    return new Selector(params[0].el);
  } else if (typeof params[0] === 'string') {
    let selector = params[0].trim(),element,simple = true;

    simple === selector.indexOf(' ') !== -1 && simple;
    simple === selector.split('.').length > 1 && simple;
    simple === selector.indexOf('>') !== -1 && simple;
    simple === selector.indexOf(',') !== -1 && simple;

    if (simple) {
      if (selector.indexOf('#') !== -1) {
        element = document.getElementById(selector.replace('#', ''));
      } else if (selector.indexOf('.') !== -1) {
        element = document.getElementsByClassName(selector.replace('.', ''));
        console.log(element, selector);
      }
    } else {
      console.log('query select');
    }
    return new Selector(element);
  }
};
exports.$ = $;
