import React from 'react';
import { connect } from 'react-redux';
import {
  redo,
  undo
} from '../../../ducks';
import Panel from './Panel';

const obj = {};

obj.displayName = 'History';

obj.render = function () {
  return <Panel name='History' visible={this.props.visible}>
    <ul className='list-redo' style={{display: 'none'}}>
      {
        this.props.redo.map((item, index) => <li className='action' key={index}>{item.type}</li>)
      }
    </ul>
    <ul className='list-undo' style={{display: 'none'}}>
      {
        this.props.undo.map((item, index) => <li className='action' key={index}>{item.type}</li>)
      }
    </ul>
  </Panel>;
};
obj.componentDidMount = function() {
  
};

const History = React.createClass(obj);

export default connect(
  function (state) {
    return {
      undo: state.Editor.history.undo,
      redo: state.Editor.history.redo,
      visible: state.Editor.panels.history.visible
    };
  },
  Object.assign({}, { redo, undo })
)(History);
