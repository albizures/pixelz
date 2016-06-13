const React = require('react');

const Editor = React.createClass({
  render () {
    console.log(this.props.params.id);
    return <h1>Editor {this.props.params.id}</h1>;
  }
});

module.exports = Editor;