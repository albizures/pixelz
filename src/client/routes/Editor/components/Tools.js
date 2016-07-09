const React = require('react');
const { connect } = require('react-redux');

const Panel = require('./Panel.js');
const { currentActions} = require('../ducks');

const obj = {};

obj.displayName = 'Tools';

obj.getInitialState = function(){
  return {
    style : {
      top : '100px',
      left : '150px',
      width : '60px'
    }
  };
};

obj.componentDidMount = function() {
  if (!this.props.tool) {
    this.props.setCurrentTool(this.props.tools[0]);
  }
};

obj.shouldComponentUpdate = function(nextProps, nextState) {
  return nextProps.tools.length !== this.props.tools.length
    || nextProps.tool !== this.props.tool;
};

obj.render = function() {
  return <Panel name="Tools" style={this.state.style}>
    {
      this.props.tools.map((item, index) => 
        <button className={this.props.tool == item? 'active' : '' } key={index}>{item.slice(0, 1)}</button>
      )
    }
  </Panel>;
};

const Tools = React.createClass(obj);

function mapStateToProps(state, props) {
  return {
    tools : state.Editor.tools,
    tool : state.Editor.tool
  };
}

module.exports = connect(
  mapStateToProps,
  currentActions
)(Tools);
