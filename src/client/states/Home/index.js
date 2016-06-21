const React = require('react');
const ReactDOM = require('react-dom');
const { Link } = require('react-router');

const ContentSprites = require('./ContentSprites/ContentSprites.js');

const Home = React.createClass({
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    var stats = node.getBoundingClientRect();
    console.log(stats.width);
  },
  render () {
    return <div className="content-home">
      <h1> Home</h1>
      <Link to='/editor'>Editor</Link>
      <ContentSprites/>
    </div>;
  }
});

module.exports = Home;