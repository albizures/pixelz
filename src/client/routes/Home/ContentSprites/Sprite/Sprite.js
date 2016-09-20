const React = require('react');
const ReactDOM = require('react-dom');
const { Link } = require('react-router');

module.exports = React.createClass({
  render () {
    return <li className="sprite">
      <img src={this.props.data.preview}/>
      <Link to={'/editor/' + this.props.data._id}>{this.props.data.name}</Link>
    </li>;
  }
});
