const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');

const Sprite = require('./Sprite/Sprite.js');

module.exports = React.createClass({
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    var stats = node.getBoundingClientRect();

    console.log(stats.width);
    http.get('/api/sprites', result => this.setState({sprites : result.data}));
  },
  getInitialState () {
    return {
      sprites: []
    };
  },
  render () {
    return <div className="content-sprites">
      <ul>
        {
          this.state.sprites.map(sprite => {
            return <Sprite key={sprite._id} data={sprite}/>;
          })
        }
      </ul>
    </div>;
  }
});

