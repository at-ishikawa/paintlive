import { connect } from 'react-redux';
import IndexPageComponent from '../components/pages/IndexPage';
import { ModeTransitions, CanvasEvents } from '../actions/canvas';

const mapStateToProps = (state) => {
  let mode = state.reducers.canvasModes.mode;
  return {
    mode: mode,
    layerCount: state.reducers.canvasModes.layerCount
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (width, height) => {
      dispatch({
        type: 'initialize',
        width: width,
        height: height
      });
    },
    setCanvasContext: (context) => {
      dispatch({
        modeType: ModeTransitions.INIT,
        type: ModeTransitions.INIT,
        canvasContext: context
      });
    },
    onClick: (point) => {
      dispatch({
        type: CanvasEvents.CLICK,
        point: point
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
