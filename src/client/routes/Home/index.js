import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import { actions } from './ducks';
import ContentSprites from './ContentSprites/ContentSprites';

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

export default connect(mapStateToProps, actions)(Home);