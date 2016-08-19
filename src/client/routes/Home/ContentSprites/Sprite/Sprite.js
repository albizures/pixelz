const React = require('react');
const ReactDOM = require('react-dom');
const { Link } = require('react-router');

module.exports = React.createClass({
  render () {
    return <li className="sprite">
      <Link to={'/editor/' + this.props.data._id}>{this.props.data.name}</Link>
    </li>;
  }
});
