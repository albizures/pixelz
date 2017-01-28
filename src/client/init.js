require('./style/main.styl');
require('./polyfill.js');

window.hasVal = (val) => {
  return typeof val !== 'undefined' && val !== null;
};
window.$ = require('utils/dom.js').$;
window.$window = $(window);

const $window = $(window);
$window.on('keydown.general', evt =>{
  window.CTRL_KEY = evt.ctrlKey;
  window.ALT_KEY = evt.altKey;
}).on('keyup.general', evt => {
  window.CTRL_KEY = evt.ctrlKey;
  window.ALT_KEY = evt.altKey;
});

const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, browserHistory } = require('react-router');
const {Provider} = require('react-redux');

const store = require('./store.js').store;
const Home = require('./routes/Home');
const Editor = require('./routes/Editor');
const Tooltip = require('./components/Tooltip.js');
const http = require('http');
const palettes = require('./ducks/palettes.js');
const User = require('./ducks/user.js');
const { currentActions: editorActions } = require('./routes/Editor/ducks');

http.get('/api/palettes').then(function (result) {
  if (result.code !== 0 || !result.data) {
    return;
  }
  store.dispatch(palettes.actions.addPalettes(result.data));
  store.dispatch(editorActions.setCurrentPalette(0));
});

http.get('/api/auth/whoami').then(function (user) {
  if (!User) {
    return;
  }
  store.dispatch(User.actions.setUser(user));
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