const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');

const { actions: {addSpritesHome} } = require('../ducks/sprites.js');
const { actions: {addSprites} } = require('../../../ducks/sprites.js');
const Sprite = require('./Sprite/Sprite.js');
const { CSSGrid, measureItems, makeResponsive, layout: layouts } = require('react-stonecutter');
const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
  maxWidth: 1920,
  minPadding: 100
});
console.log(layouts);

const ContentSprites = React.createClass({
  componentDidMount() {
    console.trace('http execute');
    http.get('/api/sprites/public', result => {
      console.trace('http result');
      this.props.addSpritesHome(
        this.props.addSprites(result)
      );
    });
  },
  render () {
    return <div className="content-sprites">
      <Grid 
        component="ul"
        className="grid"
        duration={800}
        columnWidth={250}
        gutterWidth={5}
        gutterHeight={5}
        layout={layouts.pinterest}
      >
        {
          this.props.filter.map(index => {
            let sprite = this.props.sprites[index];
            return <li className="grid-item" key={index}><Sprite data={sprite}/></li>;
          })
        }
      </Grid>
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
