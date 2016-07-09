
const React = require('react');

const { editProp } = require('utils/ducks.js');

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
    contentPanels : false,
    style : {}
  };
};
obj.getInitialState = function () {
  return {
    tabIndex : this.props.tabDefault,
    style : editProp(this.props.style, 'visibility', undefined)
  };
};
obj.setTabIndex = function(index){
  this.setState({
    tabIndex : index
  });
};
obj.getTabs = function() {
  let style = {
    height : '25px',
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
    top : '25px',
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
    visibility : this.props.style.visibility || 'visible'
  };
};
obj.render = function(){
  return <div style={this.getStylePanel()} className={'panel panel-' + this.props.name.toLowerCase()}>
    {
      this.props.dragBar? <div className="drag-bar">{this.props.name}</div> : undefined
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

module.exports = Panel;