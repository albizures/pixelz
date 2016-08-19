const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');

const ducks = require('../ducks/sprites.js');
const Sprite = require('./Sprite/Sprite.js');

const ContentSprites = React.createClass({
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    var stats = node.getBoundingClientRect();
    console.log(stats.width);
    
    http.get('/api/sprites', result => result.data.forEach(item => this.props.addSprite(item)));
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
    sprites: state.Home.sprites,
  };
}

module.exports = connect(mapStateToProps, ducks.actions)(ContentSprites);
