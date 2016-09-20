'use strict';

const React = require('react');
const { store } = require('../store.js');
const http = require('http');
const { actions: {setUser} } = require('../ducks/user.js');
const obj = {};

obj.displayName = 'LoginButton';

obj.getDefaultProps = function () {
  return {
    onLogin : () => {}
  };
};

obj.onClick = function () {
  let url = '';
  if (this.props.twitter) {
    url = '/api/auth/twitter';
  }

  this.newWin = window.open(url);
  this.intervalID = setInterval(this.intervalClose, 200);
};

obj.intervalClose = function () {
  if (!this.newWin.closed) return;

  http.get('/api/auth/whoami').then(result => {
    if (!result) return;
    
    console.log(result);
    store.dispatch(setUser(result.data));
    this.props.onLogin();
  });
  clearInterval(this.intervalID);
};

obj.render = function () {
  let text = '';
  let style = {};
  if (this.props.twitter) {
    text = 'Connect with Twitter';
    style.background = '#00aced';
  }
  return <a onClick={this.onClick} style={style} className={this.props.className}>
    {text}
  </a>;
};

const LoginButton = React.createClass(obj);

module.exports = LoginButton;