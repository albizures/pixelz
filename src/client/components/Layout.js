const React = require('react');

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
    let style = {
      width: item.width  + '%'
    };
    style.left = offset + '%';
    offset += item.width;
    return <Component style={style} className='col-item' key={key} {...item.props}/>;
  });
};

obj.getChildrenRow = function (children) {
  let offset = 0;
  return children.map((item, key) => {
    let Component = components[item.component];
    let style = {
      height: item.height  + '%'
    };
    style.top = offset + '%';
    offset += item.height;
    return <Component style={style} className='row-item' key={key} {...item.props}/>;
  });
};

obj.getChildrenStack = function (children, active = 0) {
  let result = [], tabs = [];
  let key = 0;
  let item = children[0];
  let Component = components[item.component];
  for (let j = 0; j < children.length; j++) {
    let className = active === j ? 'active' : '';
    let item = children[j];
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

obj.getChildren = function () {
  switch (this.props.mode) {
    case 'col':
      return this.getChildrenCol(this.props.children);
    case 'row':
      return this.getChildrenRow(this.props.children);
    case 'stack':
      return this.getChildrenStack(this.props.children, this.state.active);
    default:
      throw 'Invalid mode: ' + this.props.mode;
  }
};

obj.render = function () {
  let className = this.props.mode + ' layout ' + this.props.name.toLowerCase() + ' ' + (this.props.className || '');
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