const React = require('react');
const { connect } = require('react-redux');

const { actions } = require('../ducks/history.js');
const Context = require('./Context.js');
const Panel = require('./Panel.js');

const $window = $(window);

const obj = {};

obj.displayName = 'History';

obj.render = function () {
  return <Panel name='History' visible={this.props.visible}>
    <ul className='list-redo' style={{display : 'none'}}>
      {
        this.props.redo.map((item, index) => <li className='action' key={index}>{item.type}</li>)
      }
    </ul>
    <ul className='list-undo' style={{display : 'none'}}>
      {
        this.props.undo.map((item, index) => <li className='action' key={index}>{item.type}</li>)
      }
    </ul>
  </Panel>;
};
obj.componentDidMount = function() {
  
};

const History = React.createClass(obj);

module.exports = connect(
  function (state, props) {
    return {
      undo : state.Editor.history.undo,
      redo : state.Editor.history.redo,
      visible : state.Editor.panels.history.visible
    };
  },
  Object.assign({}, actions)
)(History);
