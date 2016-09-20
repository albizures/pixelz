const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { ModalManager } = require('react-dynamic-modal');
const Login = require('../modals/Login.js');
const obj = {};

obj.displayName = 'Narbar';

obj.onLogin = function () {
  ModalManager.open(<Login/>);
};

obj.render = function () {
  let profile;
  if (this.props.user) {
    profile = <div className='nav-item img dropdown'>
      <img src={this.props.user.profileImage}/>
    </div>;
  } else {
    profile = <a className='nav-item' onClick={this.onLogin}>Login / Sign in</a>;
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

module.exports = connect(mapStateToProps)(Narbar);