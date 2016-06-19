const React = require('react');
const ReactDOM = require('react-dom');
const EditorClass = require('../../Editor');
const Editor = React.createClass({
  componentDidMount() {
    window.Editor = new EditorClass(ReactDOM.findDOMNode(this));
    window.Editor.init(this.props.params.sprite);
  },
  render () {
    return <div className="editor-content"></div>;
  }
});

module.exports = Editor;