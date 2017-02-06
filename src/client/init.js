import './style/main.styl';
import './polyfill';

window.hasVal = (val) => {
  return typeof val !== 'undefined' && val !== null;
};

import { $ } from './utils/dom';

window.$ = $;
window.$window = $(window);

const $window = $(window);
$window.on('keydown.general', evt =>{
  window.CTRL_KEY = evt.ctrlKey;
  window.ALT_KEY = evt.altKey;
}).on('keyup.general', evt => {
  window.CTRL_KEY = evt.ctrlKey;
  window.ALT_KEY = evt.altKey;
});

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

import { store } from './store';
import Home from './routes/Home';
import Editor from './routes/Editor';
import Tooltip from './components/Tooltip';
import http from './utils/http';

import {
  setCurrentPalette,
  addPalettes,
  setUser
} from './ducks';

http.get('/api/palettes').then(function (result) {
  if (result.code !== 0 || !result.data) {
    return;
  }
  store.dispatch(addPalettes(result.data));
  store.dispatch(setCurrentPalette(0));
});

http.get('/api/auth/whoami').then(function (user) {
  store.dispatch(setUser(user));
});

ReactDOM.render((
  <div className="root rdl-dark">
    <Tooltip/>
    <Provider store={store}>
      <Router history={browserHistory }>
        <Route path="/" component={Home} />
        <Route path="/editor" component={Editor} />
      </Router>
    </Provider>
  </div>
), document.getElementById('root'));