import { combineReducers } from 'redux';
import { PenMode, SelectMode } from './canvas';
import { ModeTransitions, CanvasEvents } from '../actions/canvas';

const initialState = {
  mode: new SelectMode(),
  canvasContext: null
};

function canvasModes(state = initialState, action) {
  let newState = {};
  switch (action.type) {
  case ModeTransitions.INIT:
    newState = {
      mode: new SelectMode(action.canvasContext),
      canvasContext: action.canvasContext
    };
    break;
  case ModeTransitions.PEN_MODE:
    newState = {
      mode: new PenMode(state.canvasContext)
    };
    break;
  case ModeTransitions.SELECT_MODE:
    newState = {
      mode: new SelectMode(state.canvasContext)
    };
    break;

  case CanvasEvents.MOUSE_DOWN:
    state.mode.setDragging(true);
    state.mode.onMouseDown(action.point);
    return state;
  case CanvasEvents.MOUSE_UP:
    state.mode.setDragging(false);
    state.mode.onMouseUp(action.point);
    return state;
  case CanvasEvents.MOUSE_MOVE:
    state.mode.onMouseMove(action.point);
    return state;

  default:
    return state;
  }
  return Object.assign({}, state, newState);
}


export default combineReducers({
  canvasModes
});
