import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import Login from '../modals/Login';
const obj = {};

obj.displayName = 'Narbar';

obj.onLogin = function (evt) {
  evt.preventDefault();
  ModalManager.open(<Login/>);
};

obj.render = function () {
  let profile;
  if (this.props.user) {
    profile = <div className='nav-item img dropdown'>
      <img src={this.props.user.profileImage}/>
    </div>;
  } else {
    profile = <a href='' className='nav-item' onClick={this.onLogin}>Login / Sign in</a>;
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

export default connect(mapStateToProps)(Narbar);