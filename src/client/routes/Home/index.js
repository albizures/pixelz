const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const http = require('http');

const Navbar = require('../../components/Navbar.js');
const ducks = require('./ducks');
const ContentSprites = require('./ContentSprites/ContentSprites.js');

const Home = React.createClass({
  render () {
    return <div className="content-home">
      <Navbar/>
      <h1> Home</h1>
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