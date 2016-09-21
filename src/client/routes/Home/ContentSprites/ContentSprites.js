const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');

const { actions: {addSpritesHome} } = require('../ducks/sprites.js');
const { actions: {addSprites} } = require('../../../ducks/sprites.js');
const Sprite = require('./Sprite/Sprite.js');

const ContentSprites = React.createClass({
  componentDidMount() {
    // var node = ReactDOM.findDOMNode(this);
    // var stats = node.getBoundingClientRect();
    console.trace('http execute');
    http.get('/api/sprites', result => {
      console.trace('http result');
      this.props.addSpritesHome(
        this.props.addSprites(result.data)
      );
    });
  },
  render () {

    return <div className="content-sprites">
      <ul>
        {
          this.props.filter.map(index => {
            let sprite = this.props.sprites[index];
            return <Sprite key={index} data={sprite}/>;
          })
        }
      </ul>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    sprites: state.sprites,
    filter: state.Home.sprites
  };
}

module.exports = connect(
  mapStateToProps, 
  {addSprites, addSpritesHome}
)(ContentSprites);
