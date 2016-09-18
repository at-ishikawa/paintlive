import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintActions from '../../actions/paint/paint';

class PaintComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.canvases = [];
  }

  componentWillMount() {
  }

  componentDidMount() {
    const width = 128;
    const height = 64;
    var context = this.canvases[this.props.currentLayerIndex].getContext('2d');
    this.props.initialize(width, height, context);
  }

  componentDidUpdate() {
    if (this.props.layerCount < this.canvases.length) {
      for (var i = this.props.layerCount; i < this.canvases.length; i++) {
        // this.contexts[i] = this.canvases[i].getContext('2d');
      }
    }
  }

  getCanvasPoint(event) {
    const rect = this.canvases[this.props.currentLayerIndex].getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    return point;
  }

  onClick(event) {
    const point = this.getCanvasPoint(event);
    this.props.onClickPaint(point);
    this.props.currentMode.onClick(this.props.currentContext, point);
  }

  onMouseDown(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseDownPaint(point);
    this.props.currentMode.onMouseDown(this.props.currentContext, point);
  }

  onMouseUp(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseUpPaint(point);
    this.props.currentMode.onMouseUp(this.props.currentContext, point);
  }

  onMouseMove(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseMovePaint(point);
    this.props.currentMode.onMouseMove(this.props.currentContext, point, this.props.isDragging);
  }

  render() {
    const width = 128;
    const height = 64;

    const style = {
      width: '760px',
      height: '480px',
      border: '1px solid',
      position: 'absolute'
    };

    return (
      <div>
        {Array(this.props.layerCount).fill(1).map((_, i) => (
            <canvas ref={ (component) => this.canvases[i] = component }
                    width={ width }
                    height={ height }
                    style={ style }
                    onClick={ this.onClick }
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp }
                    onMouseMove={ this.onMouseMove }>
            </canvas>
        ))}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state.reducers.paint;
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(PaintActions, dispatch)
  };
};

const Paint = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintComponent);

export default Paint;
