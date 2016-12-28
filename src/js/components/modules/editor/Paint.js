import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintActions from 'actions/editor/paint';

import style from "module/editor/paint";

class PaintComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canvases = [];
  }

  componentDidMount() {
    // var context = this.canvases[this.props.currentLayerIndex].getContext('2d');
    // this.props.initialize(context);

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
    this.props.contexts.forEach((context, index) => {
      const layer = this.props.layers[index];
      if (layer.isBackground) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      } else {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      }
      if (layer.url) {
        const image = new Image();
        image.src = layer.url;
        context.drawImage(image, 0, 0, image.width, image.height);
      }
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
      for (var i = 0; i < this.props.contexts.length; i++) {
        const context = this.canvases[i].getContext('2d');
        if (context === this.props.contexts[i]) {
          continue;
        }
        this.props.setContext(i, context);
      }
      for (i = this.props.contexts.length; i < this.canvases.length; i++) {
        let context = this.canvases[i].getContext('2d');
        this.props.setContext(i, context);
      }
    }

    if (this.props.imageFileType) {
      const context = this.exportCanvas.getContext('2d');
      context.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height);
      this.canvases.forEach((canvas) => {
        context.drawImage(canvas, 0, 0);
      });

      var image = new Image();
      image.onload = () => {
        this.downloadLink.setAttribute('download', 'Download.png');
        this.downloadLink.setAttribute('href', image.src);
        this.downloadLink.click();
        this.props.exportedImage();
      };
      image.src = this.exportCanvas.toDataURL("image/" + this.props.imageFileType);
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
    return (
      <div className={ style.paint }>
        <a style={{ display: "none" }}
           ref={ (component) => { this.downloadLink = component; } }
          />
        <div className={ style.paint__header}>
          { this.props.name }
        </div>
        <div className={ style.paint__canvasContainer}>
          <canvas ref={ (component) => { this.exportCanvas = component; } }
            hidden="true"
            width={ this.props.width }
            height={ this.props.height }
            />
          {this.props.layers.map((layer, i) => (
            <canvas key={ layer.id }
                    ref={ (component) => this.canvases[i] = component }
              id={ layer.id }
              className={ style.paint__canvas }
              width={ this.props.width }
              height={ this.props.height }
              style={{
                width: this.props.width,
                height: this.props.height
              }}
              onClick={ this.onClick }
              onMouseDown={ this.onMouseDown }
              onMouseUp={ this.onMouseUp }
              onMouseMove={ this.onMouseMove }
              hidden={ !layer.isVisible }
              >
</canvas>
          ))}
        </div>

        <div className={ style.paint__footer }>
          { this.props.isSaved ? 'Saved' : 'Changing...' },
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
