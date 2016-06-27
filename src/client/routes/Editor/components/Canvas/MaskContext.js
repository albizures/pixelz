const React = require('react');

const MainContext = React.createClass({
  componentDidMount() {
    
  },
  componentWillUpdate(nextProps, nextState) {
    //return false;
  },
  render() {
    return <canvas {...this.props} className='mask'></canvas>;
  }
});

module.exports = MainContext;