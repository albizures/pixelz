const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');

const obj = {};

obj.displayName = 'Narbar';

obj.render = function () {
  let profile;
  if (this.props.user) {
    profile = <div className='nav-item img dropdown'>
      <img src={this.props.user.profileImage}/>
    </div>;
      // <ul>
      //   <li></li>
      // </ul>
  } else {
    profile = <a className='nav-item' href='/api/auth/twitter'>Login / Sign in</a>;
  } 

  return <nav className='navbar'>
    <div className='navbar-header'>
      <a className='navbar-brand'><h2>Pixore</h2></a>
    </div>
    <div className='navbar-right'>
      { profile }
      <Link className='nav-item btn' to='/editor'>Start drawing</Link>
    </div>
  </nav>;
    // <div className='navbar-collapse collapse'>
    //   <ul>
    //     <li></li>
    //     <li></li>
    //   </ul>
    // </div>
};

const Narbar = React.createClass(obj);

function mapStateToProps(state, props) {
  return {
    user: state.user,
  };
}

module.exports = connect(mapStateToProps)(Narbar);