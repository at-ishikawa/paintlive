import { PenMode, SelectMode, PaintMode } from './canvas';
import { ModeTransitions, CanvasEvents } from '../actions/canvas';

const initialState = {
  mode: new SelectMode(),
  canvasContext: null,
  layerCount: 1
};

function canvasModes(state = initialState, action) {
  let newState = {};
  switch (action.type) {
  case 'initialize':
    newState = {
      width: action.width,
      height: action.height
    };
    break;

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
  case ModeTransitions.PAINT_MODE:
    newState = {
      mode: new PaintMode(state.canvasContext, state.width, state.height)
    };
    break;

  case CanvasEvents.CLICK:
    state.mode.onClick(action.point);
    return state;

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

  case 'add layer':

    newState = {
      layerCount: state.layerCount + 1
    };
    break;

  case 'import image':
    var filePath = action.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var url = event.target.result;

      var image = new Image();
      image.onload = function() {
        state.canvasContext.drawImage(image, 0, 0);
      };

      image.src = url;
    };
    fileReader.readAsDataURL(filePath);
    return state;

  case 'save image':
    // TODO Save Image as a merge
    var imageUrl = this.canvases[this.currentLayerIndex].toDataURL("image/png");
    this.downloadLink.href = imageUrl;

    return state;

  default:
    return state;
  }
  return Object.assign({}, state, newState);
}

export default canvasModes;
