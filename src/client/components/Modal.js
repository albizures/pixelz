const React = require('react');
const ReactDOM = require('react-dom');

const el = document.getElementById('modals');

const modals = {};
const stack = [];
const obj = {};

obj.displayName = 'Modal';

obj.componentDidMount = function () {
  this.refs.content.addEventListener('keydown', this.onEsc);
};


obj.onEsc = function (evt) {
  console.log(evt);
  if (evt.keyCode === 27 /*esc*/) this.props.close();
};

obj.onClickBackdrop = function () {
  this.props.close();
};

obj.render = function () {
  let style = {};
  style.width = this.props.width;
  return <div className='modal'>
    <div className='backdrop' onClick={this.onClickBackdrop}></div>
    <div className='modal-content' ref='content' onKeyDown={this.onEsc} style={style}>
      {this.props.children}
    </div>
  </div>;
};

const Modal = React.createClass(obj);


/**
 * register a modal
 * @param {Object} modal
 * @param {string} name
 */
function register(modal, name) {
  name = name || modal.displayName;
  if (modals[name]) {
    throw 'Modal \'' + name + '\' already exists';
  }
  modals[name] = modal;
};

function close(index) {
  if (Number.isInteger(index)) {
    stack.splice(index, 1);
  } else {
    stack.pop();
  }
  render();
}

function render() {
    // {stack.map((Component, index) => {
    //   function closeModal() {
    //     close(index);
    //   }
    //   return <Component close={closeModal} key={index}/>;
    // })}
  ReactDOM.render(<div>
    {stack}
  </div>, el);
}

function open(Component) {
  if (typeof Component === 'string') {
    Component = modals[Component];
  }
  let index = stack.length;
  function closeModal() {
    close(index);
  }
  stack.push(<Component close={closeModal} key={stack.length}/>);
  render();
}
exports.close = close;
exports.open = open;
exports.register = register;
exports.Modal = Modal;
