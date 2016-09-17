'use strict';

const http = require('http'); 
const { editProp, updateArrayItem } = require('utils/ducks.js');

const SET_USER = 'SET_USER';

exports.initialState = {};

exports.reducer = function (state = {}, action) {
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

actions.setUser = function (user) {
  return {
    type : SET_USER,
    user
  };
};

exports.actions = actions;