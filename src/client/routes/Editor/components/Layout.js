const React = require('react');
const classNames = require('classnames');
const components = {};

const obj = {};

obj.displayName = 'Layout';

obj.getInitialState = function () {
  if (this.props.mode === 'stack') {
    return {
      active: this.props.active
    };
  }
  return {};
};

obj.getChildrenCol = function (children) {
  let offset = 0;
  
  return children.map((item, key) => {
    let Component = components[item.component];
    let style;
    if (item.style) {
      style = item.style;
    } else {
      style = {
        width: item.width  + '%'
      };
      style.left = offset + '%';
      offset += item.width;
    }
    return <Component style={style} className='col-item' key={key} {...item.props}/>;
  });
};

obj.getChildrenRow = function (children) {
  let offset = 0;
  return children.map((item, key) => {
    let Component = components[item.component];
    let style;
    if (item.style) {
      style = item.style;
    } else {
      style = {
        height: item.height  + '%'
      };
      style.top = offset + '%';
      offset += item.height;
    }
    return <Component style={style} className='row-item' key={key} {...item.props}/>;
  });
};

obj.getChildrenStack = function (children, active = 0) {
  let result = [], tabs = [];
  let key = 0;
  for (let j = 0; j < children.length; j++) {
    let className = active === j ? 'active' : '';
    let item = children[j];
    let Component = components[item.component];
    tabs.push(
      <div className={'tab ' + className} key={key++} onClick={evt => this.onClickTab(evt, j)}>{item.name}</div>
    );
    result.push(
      <Component className={'stack-item ' + className } {...item.props} key={key++}/>
    );
  }
  return tabs.concat(result);
};

obj.onClickTab = function (evt, active) {
  this.setState({active});
};
obj.getFloatChildren = function (children = [], key) {
  return children.map(item => {
    let Component = components[item.component];
    return <Component key={key++} className={'float-item'}/>;
  });
};

obj.getChildren = function () {
  let children = [];
  switch (this.props.mode) {
    case 'col':
      children = this.getChildrenCol(this.props.children);
      break;
    case 'row':
      children = this.getChildrenRow(this.props.children);
      break;
    case 'stack':
      children = this.getChildrenStack(this.props.children, this.state.active);
      break;
    default:
      throw 'Invalid mode: ' + this.props.mode;
  }
  children = children.concat(
    this.getFloatChildren(this.props.float, children.length)
  );
  return children;

};

obj.render = function () {
  let className = classNames(
    this.props.mode,
    'layout',
    this.props.name.toLowerCase(),
    this.props.className
  );
  return <div className={className} style={this.props.style}>
    {this.getChildren()}
  </div>;
};

const Layout = React.createClass(obj);

function register(component, name) {
  name = name || component.displayName;
  if (components[name]) {
    throw 'Component \'' + name + '\' already exists';
  }
  components[name] = component;
}

register(Layout);
exports.register = register;
exports.Layout = Layout;