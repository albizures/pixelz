const React = require('react');

const Panel = require('./Panel.js');

const Palettes = React.createClass({

  render() {
    return <Panel name="Palettes" style={this.props.style}>
      <button >=</button>
    </Panel>;
  }
});

module.exports = Palettes;