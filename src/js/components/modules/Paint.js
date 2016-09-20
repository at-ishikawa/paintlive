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

    const style = {
      width: '760px',
      height: '480px',
      border: '1px solid',
      position: 'absolute'
    };

    return (
      <div>
        {this.props.layers.map((layer, i) => (
            <canvas key={ layer.id }
                    ref={ (component) => this.canvases[i] = component }
                    width={ width }
                    height={ height }
                    style={ style }
                    onClick={ this.onClick }
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp }
                    onMouseMove={ this.onMouseMove }
                    hidden={ !layer.isVisible }
            >
            </canvas>
        ))}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const paint = state.reducers.paint;
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
