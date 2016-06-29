const React = require('react');

const Range = React.createClass({
  handleChange(evt){
    this.props.handleChange(evt.target.value);
  },
  render() {
    return <input type="range" onChange={this.handleChange} {...this.props}/>;
  }
});

module.exports = Range;