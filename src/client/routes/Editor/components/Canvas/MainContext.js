
const React = require('react');

const MainContext = React.createClass({
  componentDidMount() {
    
  },
  componentWillUpdate(nextProps, nextState) {
    //return false;
  },
  render() {
    return <canvas {...this.props} className='main'></canvas>;
  }
});

module.exports = MainContext;