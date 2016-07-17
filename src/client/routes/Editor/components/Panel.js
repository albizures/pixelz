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
    tabs : false,
    float : false,
    contentPanels : false
  };
};
obj.getInitialState = function () {
  return {
    tabIndex : this.props.tabDefault,
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

obj.setTabIndex = function(index){
  this.setState({
    tabIndex : index
  });
};
obj.getTabs = function() {
  let style = {
    height : 25,
    lineHeight : '25px',
    float : 'left',
    width : (100 / this.props.children.length) + '%'
  };
  return this.props.children.map((item, index) => {
    return <div key={index} style={style} onClick={() => this.setTabIndex(index)} className={'content-panel-tab' + (index == this.state.tabIndex? ' active' : '')}>
      {item.props.name}
    </div>;
  });
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
    height : 'calc(100% - 25px)',
    top : 25,
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
  $window.on('mousemove.drag', evt => {
    this.setState({
      style : Object.assign({}, this.state.style,{
        top : evt.clientY - diffY,
        left : evt.clientX - diffX
      })
    });
  }).on('mouseup.drag', evt => {
    $window.off('mousemove.drag').off('mouseup.drag');
  });
};

obj.render = function(){
  var className = 'panel panel-' + this.props.name.toLowerCase().replace(' ', '') + (this.props.float? ' float' : '');
  return <div style={this.getStylePanel()} className={className}>
    {
      this.props.dragBar? <div className="drag-bar" onMouseDown={this.onMouseDown}>{this.props.name}</div> : undefined
    }
    {
      this.props.tabs? this.getTabs() : undefined
    }
    {
      this.props.contentPanels && this.props.tabs? this.getPanelChildren() : this.props.children
    }
  </div>;
};
const Panel = React.createClass(obj);

module.exports = connect(null, actions)(Panel);