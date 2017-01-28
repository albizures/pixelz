const React = require('react');
const ReactDOM = require('react-dom');
// const { Link } = require('react-router');

module.exports = React.createClass({
  render () {
      // <Link to={'/editor/' + this.props.data._id}>
      // </Link>
        // <img src={this.props.user.profileImage}/>
    return <div className="sprite">
      <div className='header'>
        <a>
          <img src={this.props.data.user.profileImage}/>
        </a>
        <span>
          {this.props.data.user.displayName}
          <br/>
          <div className='username'>{this.props.data.user.username}</div>
        </span>
      </div>
      <img src={this.props.data.preview}/>
      <div className='footer'>
        {this.props.data.name}
      </div>
    </div>;
  }
});
