

const React = require('react');

const Panel = React.createClass({
  propTypes : {
    name : React.PropTypes.string.isRequired
  },
  getDefaultProps () {
    return {
      dragBar : true,
      resize : false,
      tabs : false,
      contentPanels : false
    };
  },
  getInitialState () {
    let style = this.props.style;
    delete style.visibility;
    return {
      tabIndex : this.props.tabDefault,
      style : style
    };
  },
  setTabIndex(index){
    this.setState({
      tabIndex : index
    });
  },
  getTabs() {
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
  },
  getPanelChildren (style) {
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
  },
  getStyleChildPanel(visibility) {
    return {
      width : '100%',
      height : 'calc(100% - 25px)',
      top : '25px',
      left : 0,
      visibility
    };
  },
  getStylePanel() {
    return {
      width : this.state.style.width,
      height : this.state.style.height,
      top : this.state.style.top,
      left : this.state.style.left,
      visibility : this.props.style.visibility || 'visible'
    };
  },
  render(){
    let tabActive = this.props.children[this.state.tabIndex];
    return <div style={this.getStylePanel()} className={'panel panel-' + this.props.name.toLowerCase()}>
      {
        this.props.dragBar? <div className="drag-bar">{this.props.name}</div> : undefined
      }
      {
        this.props.tabs? this.getTabs() : undefined
      }
      {
        this.props.contentPanels? this.getPanelChildren() : this.props.children
      }
    </div>;
  }
});

module.exports = Panel;