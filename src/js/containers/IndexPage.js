import { connect } from 'react-redux';
import IndexPageComponent from '../components/pages/IndexPage';
import { ModeTransitions, CanvasEvents } from '../actions/canvas';

const mapStateToProps = (state) => {
  let mode = state.reducers.canvasModes.mode;
  return {
    mode: mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasContext: (context) => {
      dispatch({
        type: ModeTransitions.INIT,
        canvasContext: context
      });
    },
    onPenModeClick: () => {
      dispatch({
        type: ModeTransitions.PEN_MODE
      });
    },
    onMouseDown: (point) => {
      dispatch({
        type: CanvasEvents.MOUSE_DOWN,
        point: point
      });
    },
    onMouseUp: (point) => {
      dispatch({
        type: CanvasEvents.MOUSE_UP,
        point: point
      });
    },
    onMouseMove: (point) => {
      dispatch({
        type: CanvasEvents.MOUSE_MOVE,
        point: point
      });
    }
  }
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;
