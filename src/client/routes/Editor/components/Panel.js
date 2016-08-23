const React = require('react');
const { connect } = require('react-redux');

const { actions } = require('../ducks/panels.js');
const { editProp } = require('utils/ducks.js');

const $window = $(window);
const obj = {};

obj.displayName = 'Panel';

obj.propTypes =  {
  name : React.PropTypes.string.isRequired
};
obj.getDefaultProps = function () {
  return {
    dragBar : true,
    resize : false,
    float : false
  };
};
obj.getInitialState = function () {
  return {
    style : Object.assign({}, this.props.style)
  };
};

obj.componentWillReceiveProps = function(nextProps) {
  if (nextProps.style !== this.props.style) {
    this.setState({
      style : Object.assign({}, nextProps.style)
    });
  }
};
obj.getPanelChildren = function(style) {
  return this.props.children.map((item, index) => {
    return React.cloneElement(item,
      Object.assign({},
        item.props, {
          style : this.getStyleChildPanel(index == this.state.tabIndex? 'visible' : 'hidden'),
          key : index,
        }
      )
    );
  });
};
obj.getStyleChildPanel = function(visibility) {
  return {
    width : '100%',
    height : 'calc(100% - 20px)',
    top : 20,
    left : 0,
    visibility
  };
};
obj.getStylePanel = function() {
  return {
    width : this.state.style.width,
    height : this.state.style.height,
    top : this.state.style.top,
    left: this.state.style.left,
    right : this.state.style.right,
    position : this.state.style.position,
    visibility : this.state.style.visibility || 'visible'
  };
};

obj.onMouseDown = function (evt) {
  var name = this.props.name.replace(' ', '');
  var stats = evt.target.getBoundingClientRect();
  var diffX = evt.clientX - stats.left;
  var diffY = evt.clientY - stats.top;
  var maxLeft = window.innerWidth - evt.target.clientWidth;
  var maxTop = window.innerHeight - evt.target.clientHeight;
  $window.on('mousemove.drag', evt => {
    let top = evt.clientY - diffY;
    let left = evt.clientX - diffX;
    if (top < 25) {
      top = 25;
    }
    if (left < 0) {
      left = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }
    if (top > maxTop) {
      top = maxTop;
    }
    this.setState({
      style : Object.assign({}, this.state.style,{
        top,
        left
      })
    });
  }).on('mouseup.drag', evt => {
    $window.off('mousemove.drag').off('mouseup.drag');
  });
};

obj.getDragbar = function () {
  if (!this.props.dragBar) {
    return '';
  }
  if (this.props.float) {
    return <div className="drag-bar" onMouseDown={this.onMouseDown}>{this.props.name}</div>;
  }
  return <div className="drag-bar">{this.props.name}</div>;
};
obj.render = function(){
  var className = 
    'panel panel-' + 
    this.props.name.toLowerCase().replace(' ', '') + 
    (this.props.float? ' float ' : ' ') + 
    (this.props.className? this.props.className: ' ');
  return <div style={this.getStylePanel()} className={className}>
    {
      this.getDragbar()
    }
    { 
      this.props.children
    }
  </div>;
};
const Panel = React.createClass(obj);

module.exports = connect(null, actions)(Panel);