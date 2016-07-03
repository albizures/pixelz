const React = require('react');
const { connect } = require('react-redux');
const Panel = require('./Panel.js');
const { currentActions} = require('../ducks');


const Tools = React.createClass({
  getHandler() {

  },
  getButton() {

  },
  componentDidMount() {
    if (!this.props.tool) {
      this.props.setCurrentTool(this.props.tools[0]);
    }
  },
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.tools.length !== this.props.tools.length
      || nextProps.tool !== this.props.tool;
  },
  render() {
    return <Panel name="Tools" style={this.props.style}>
      {
        this.props.tools.map((item, index) => 
          <button className={this.props.tool == item? 'active' : '' } key={index}>{item.slice(0, 1)}</button>
        )
      }
    </Panel>;
  }
});

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
