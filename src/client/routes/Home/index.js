const React = require('react');
const { connect } = require('react-redux');

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

function mapStateToProps(state) {
  return {
    Home: state.Home,
  };
}

module.exports = connect(mapStateToProps, ducks.actions)(Home);