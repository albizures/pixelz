
const ADD_SPRITE = 'ADD_SPRITE';
const ADD_SPRITE_FRAME = 'ADD_SPRITE_FRAME';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_SPRITE:
      return state.concat([{
        _id : action.sprite._id,
        name : action.sprite.name,
        width : action.sprite.width,
        height : action.sprite.height,
        colors : action.sprite.colors,
        frames : [],
        index : action.index
      }]);
    case ADD_SPRITE_FRAME:
      return state.map((item, index) =>{
        if (index !== action.sprite) {
          return item;
        }
        return Object.assign({},
          item,
          { frames : item.frames.concat([action.frame])}
        );
      });
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addSprite = function (sprite) {
  return (dispatch, getState) => {
    let index = getState().Editor.sprites.length;
    dispatch({
      type : ADD_SPRITE,
      sprite : sprite,
      index: index
    });
    return index;
  };
};

exports.actions.addFrameSprite  = function (sprite, frame) {
  return {
    type : ADD_SPRITE_FRAME,
    sprite : sprite,
    frame : frame
  };
};