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
const {Provider} = require('react-redux');

const store = require('./store.js').store;
const Home = require('./routes/Home');
const Editor = require('./routes/Editor'); 

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory }>
      <Route path="/" component={Home} />
      <Route path="/editor(/:id)" component={Editor} />
    </Router>
  </Provider>
), document.getElementById('root'));