import CanvasMode from './CanvasMode';

class PenMode extends CanvasMode {

  constructor() {
    super();
  }

  getName = () => {
    return "Pen";
  }

  getMouseUpAction = (properties) => {
    const { point, layer, color, lineWidth } = { ...properties };
    return {
      mode: this.getName(),
      point: point,
      isFirstPoint: false,
      isLastPoint: true,
      strokeStyle: color.hex,
      lineWidth: lineWidth,
      layerId: layer.id
    }
  }

  getMouseDownAction = (properties) => {
    const { point, layer, color } = { ...properties };
    return {
      mode: this.getName(),
      point: point,
      isFirstPoint: true,
      isLastPoint: false,
      layerId: layer.id,
      strokeStyle: color.hex
    }
  }

  getMouseMoveAction = (properties) => {
    const { point, layer, color, lineWidth, isDragging } = { ...properties };
    if (!isDragging) {
      return;
    }

    return {
      mode: this.getName(),
      point: point,
      isFirstPoint: false,
      isLastPoint: false,
      strokeStyle: color.hex,
      lineWidth: lineWidth,
      layerId: layer.id
    }
  }
}

export default PenMode;
