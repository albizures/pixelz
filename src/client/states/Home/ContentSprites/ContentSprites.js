const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');

const Sprite = require('./Sprite/Sprite.js');

const ContentSprites = React.createClass({
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    var stats = node.getBoundingClientRect();
    console.log(stats.width);
    
    http.get('/api/sprites', result => this.props.addSprites(result.data));
  },
  render () {
    return <div className="content-sprites">
      <ul>
        {
          this.props.sprites.map(sprite => {
            return <Sprite key={sprite._id} data={sprite}/>;
          })
        }
      </ul>
    </div>;
  }
});

function mapStateToProps(state, props) {
  return {
    sprites: state.sprites,
  };
}

const actions = {};

actions.addSprites = sprites => {
  return {
    type: 'ADD_SPRITES',
    sprites
  };
};

actions.addSprite = sprite => {
  return {
    type: 'ADD_SPRITE',
    sprite
  };
};

module.exports = connect(mapStateToProps, actions)(ContentSprites);
