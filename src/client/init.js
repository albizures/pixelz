'use strict';
require('./style/main.styl');

window.hasVal = (val) => {
  return typeof val !== 'undefined' && val !== null;
};
window.$ = require('utils/dom.js').$;
require('./polyfill.js');

const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, browserHistory } = require('react-router');

const Home = require('./states/Home');
const Editor = require('./states/Editor'); 

ReactDOM.render((
  <Router history={browserHistory }>
    <Route path="/" component={Home} />
    <Route path="/editor(/:id)" component={Editor} />
  </Router>
), document.getElementById('root'));