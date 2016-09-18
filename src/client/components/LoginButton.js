'use strict';

const React = require('react');
const http = require('http');
const { connect } = require('react-redux');
const { actions: {setUser} } = require('../ducks/user.js');
const obj = {};

obj.displayName = 'LoginButton';

obj.onClick = function () {
  this.newWin = window.open('/api/auth/twitter');
  this.intervalID = setInterval(this.intervalClose, 200);
};

obj.intervalClose = function () {
  if (!this.newWin.closed) return;

  http.get('/api/auth/whoami').then(result => {
    if (!result) return;
    
    console.log(result);
    this.props.setUser(result.data || null);
  });
  clearInterval(this.intervalID);
};

obj.render = function () {
  return <a onClick={this.onClick} className={this.props.className}>
    Login / Sign in
  </a>
  //return <a className='nav-item' href=''>Login / Sign in</a>;
}

const LoginButton = React.createClass(obj);

module.exports = connect(
  null,
  {setUser}
)(LoginButton);
