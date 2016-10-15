import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintActions from '../../../actions/editor/paint';

import "_module/_editor/_paint.scss";

class PaintComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.canvases = [];
  }

  componentDidMount() {
    const width = 760;
    const height = 480;
    var context = this.canvases[this.props.currentLayerIndex].getContext('2d');
    this.props.initialize(width, height, context);
  }

  componentDidUpdate() {
    if (this.props.contexts.length < this.canvases.length) {
      for (var i = this.props.contexts.length; i < this.canvases.length; i++) {
        let context = this.canvases[i].getContext('2d');
        this.props.setContext(i, context);
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
    const width = 760;
    const height = 480;

    return (
      <div className="paint">
        <div className="paint__header">
          New Image
        </div>
        <div className="paint__canvasContainer">
          {this.props.layers.map((layer, i) => (
            <canvas key={ layer.id }
                    ref={ (component) => this.canvases[i] = component }
              className="paint__canvas"
              width={ width }
              height={ height }
              onClick={ this.onClick }
              onMouseDown={ this.onMouseDown }
              onMouseUp={ this.onMouseUp }
              onMouseMove={ this.onMouseMove }
              hidden={ !layer.isVisible }
              >
</canvas>
          ))}
        </div>

        <div className="paint__footer">
          Mode: PenMode, Point(x, y)
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const paint = state.paint;
  const props = Object.assign({}, paint, {
    currentContext: paint.contexts[paint.currentLayerIndex]
  });
  return props;
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
