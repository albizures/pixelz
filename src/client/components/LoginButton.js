
import React from 'react';
import classNames from 'classnames';
import { store } from '../store';
import http from '../utils/http';
import {
  setUser
} from '../ducks';

const obj = {};

obj.displayName = 'LoginButton';

obj.getDefaultProps = function () {
  return {
    onLogin: () => {}
  };
};

obj.onClick = function (evt) {
  evt.preventDefault();
  let url = '';
  if (this.props.twitter) {
    url = '/api/auth/twitter';
  }

  this.newWin = window.open(url);
  this.intervalID = setInterval(this.intervalClose, 200);
};

obj.intervalClose = function () {
  if (!this.newWin.closed) return;

  http.get('/api/auth/whoami').then(user => {
    console.log(user);
    if (!user) return;
    store.dispatch(setUser(user));
    this.props.onLogin();
  });
  clearInterval(this.intervalID);
};

obj.render = function () {
  let text = '';
  let style = {};
  let className = classNames(
    this.props.className,
    { 'twitter': this.props.twitter }
  );
  if (this.props.twitter) {
    text = 'Connect with Twitter';
    style.background = '#00aced';

  }
  return <a href='' onClick={this.onClick} style={style} className={className}>
    {text}
  </a>;
};

const LoginButton = React.createClass(obj);

export default LoginButton;