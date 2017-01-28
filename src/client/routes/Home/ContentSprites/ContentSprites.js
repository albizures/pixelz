import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { CSSGrid, measureItems, makeResponsive, layout as layouts } from 'react-stonecutter';

import http from '../../../utils/http';
import { actions as editorSpriteActions } from '../ducks/sprites';
import { actions as spriteActions } from '../../../ducks/sprites';
import Sprite from './Sprite/Sprite';

const {addSprites} = spriteActions;
const {addSpritesHome} = editorSpriteActions;


const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
  maxWidth: 1920,
  minPadding: 100
});

const ContentSprites = React.createClass({
  componentDidMount() {
    http.get('/api/sprites/public').then(sprites => {
      this.props.addSpritesHome(
        this.props.addSprites(sprites)
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

export default connect(
  mapStateToProps,
  {addSprites, addSpritesHome}
)(ContentSprites);
