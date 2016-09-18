'use strict';

const http = require('http'); 
const { editProp, updateArrayItem } = require('utils/ducks.js');

const SET_USER = 'SET_USER';

exports.initialState = null;

exports.reducer = function (state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

function addColor(palette, color) {
  palette = editProp(palette, 'colors', palette.colors.concat([color]));
  palette.unsaved = true;
  return palette;
}

const actions = {};

actions.setUser = function (user = null) {
  return {
    type : SET_USER,
    user
  };
};

exports.actions = actions;