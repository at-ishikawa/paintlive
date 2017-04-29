import CanvasMode from './CanvasMode';

class PenMode extends CanvasMode {

  constructor() {
    super();
  }

  getName = () => {
    return "Pen";
  }

  getMouseUpAction = (properties) => {
    const { point, history } = { ...properties };
    history.slice(-1)[0].points.push(point);
  }

  getMouseDownAction = (properties) => {
    const { point, layer, lineWidth, color } = { ...properties };
    return {
      mode: this.getName(),
      layerId: layer.id,
      isBackgroundLayer: layer.isBackground,
      strokeStyle: color.hex,
      lineWidth: lineWidth,
      points: [
        point
      ]
    }
  }

  getMouseMoveAction = (properties) => {
    const { point, isDragging, history } = { ...properties };
    if (!isDragging) {
      return;
    }

    history.slice(-1)[0].points.push(point);
  }
}

export default PenMode;
