import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintActions from '../../../actions/editor/paint';

import "_module/_editor/_paint.scss";

class PaintComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canvases = [];
  }

  componentDidMount() {
    const width = 760;
    const height = 480;
    var context = this.canvases[this.props.currentLayerIndex].getContext('2d');
    this.props.initialize(width, height, context);

    const render = () => {
      try {
        this.draw();
      } finally {
        requestAnimationFrame(render);
      }
    };
    requestAnimationFrame(render);
  }

  draw = () => {
    this.props.contexts.forEach((context) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    });

    const drawFunctions = {
      'Pen': this.drawLine,
      'Paint': this.drawPaint
    };

    this.props.history.forEach((log) => {
      drawFunctions[log.mode](log);
    });
  }

  getContext = (layerId) => {
    const canvas = this.canvases.find((canvas) => {
      return canvas.id == layerId;
    });
    const context = canvas.getContext('2d');
    return context;
  }

  drawLine = (log) => {
    const context = this.getContext(log.layerId);
    if (log.isFirstPoint) {
      context.beginPath();
      context.moveTo(log.point.x, log.point.y);
    } else if (log.isLastPoint) {
      context.lineTo(log.point.x, log.point.y);
      context.closePath();
    } else {
      context.lineTo(log.point.x, log.point.y);
      context.strokeStyle = log.strokeStyle;
      context.lineWidth = log.lineWidth;
      context.stroke();
    }
  }

  drawPaint = (log) => {
    const context = this.getContext(log.layerId);
    const { point, color } = { ...log };
    const canvas = context.canvas;
    const left = 0;
    const top = 0;
    const image = context.getImageData(left, top, canvas.width, canvas.height);

    let changed = [];
    for (let i = 0; i < canvas.height; i++) {
      changed[i] = [];
      for (let j = 0; j < canvas.width; j++) {
        changed[i][j] = false;
      }
    }
    var imageData = image.data;

    let pointPixels = [point];
    let selectedIndex = (point.y * canvas.width + point.x) * 4;
    const selectedPointImageData = [
      imageData[selectedIndex],
      imageData[selectedIndex + 1],
      imageData[selectedIndex + 2],
      imageData[selectedIndex + 3]
    ];
    while (pointPixels.length > 0) {
      var { x, y } = { ...pointPixels.pop() };
      if (y < 0 || x < 0 || y >= canvas.height || x >= canvas.width) {
        continue;
      }
      if (changed[y][x]) {
        continue;
      }

      var index = (y * canvas.width + x) * 4;
      const isSameColor = selectedPointImageData[0] == imageData[index] &&
            selectedPointImageData[1] == imageData[index + 1] &&
            selectedPointImageData[2] == imageData[index + 2] &&
            selectedPointImageData[3] == imageData[index + 3];

      if (index != selectedIndex && !isSameColor) {
        continue;
      }

      imageData[index] = color.rgb.r;
      imageData[index + 1] = color.rgb.g;
      imageData[index + 2] = color.rgb.b;
      imageData[index + 3] = color.rgb.a * 255;

      changed[y][x] = true;
      pointPixels.push({
        y: y + 1,
        x: x
      });
      pointPixels.push({
        y: y - 1,
        x: x
      });
      pointPixels.push({
        y: y,
        x: x + 1
      });
      pointPixels.push({
        y: y,
        x: x - 1
      });
    }
    context.putImageData(image, 0, 0);
  }

  componentDidUpdate() {
    if (this.props.contexts.length < this.canvases.length) {
      for (var i = this.props.contexts.length; i < this.canvases.length; i++) {
        let context = this.canvases[i].getContext('2d');
        this.props.setContext(i, context);
      }
    }
  }

  getCanvasPoint = (event) => {
    const rect = this.canvases[this.props.currentLayerIndex].getBoundingClientRect();
    const point = {
      x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top)
    };

    return point;
  }

  onClick = (event) => {
    const point = this.getCanvasPoint(event);
    this.props.onClickPaint(point);
  }

  onMouseDown = (event) => {
    const point = this.getCanvasPoint(event);
    this.props.onMouseDownPaint(point);
  }

  onMouseUp = (event) => {
    const point = this.getCanvasPoint(event);
    this.props.onMouseUpPaint(point);
  }

  onMouseMove = (event) => {
    const point = this.getCanvasPoint(event);
    this.props.onMouseMovePaint(point);
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
              id={ layer.id }
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
          Mode: { this.props.currentMode ? this.props.currentMode.getName() : 'No Select' },
          Point: { this.props.currentPoint ? '(' + this.props.currentPoint.x + ', ' + this.props.currentPoint.y + ')' : '(x, y)' },
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
