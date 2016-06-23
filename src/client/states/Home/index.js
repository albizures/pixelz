const React = require('react');
const { Link } = require('react-router');
const { Provider } = require('react-redux');

const store = require('../../store.js').store;
const ContentSprites = require('./ContentSprites/ContentSprites.js');

const Home = React.createClass({
  render () {
    return  <Provider store={store}>
      <div className="content-home">
        <h1> Home</h1>
        <Link to='/editor'>Editor</Link>
        <ContentSprites/>
      </div>
    </Provider>;
  }
});

module.exports = Home;