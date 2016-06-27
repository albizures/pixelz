const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const http = require('http');

const ducks = require('./ducks');
const ContentSprites = require('./ContentSprites/ContentSprites.js');

const Home = React.createClass({
  render () {
    return <div className="content-home">
      <h1> Home</h1>
      <Link to='/editor'>Editor</Link>
      <ContentSprites/>
    </div>;
  }
});

function mapStateToProps(state, props) {
  return {
    Home: state.Home,
  };
}

module.exports = connect(mapStateToProps, ducks.actions)(Home);