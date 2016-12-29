import CanvasMode from './CanvasMode';

class PaintMode extends CanvasMode {
  getName() {
    return "Paint";
  }

  getClickAction = (properties) => {
    const { point, layer, color } = { ...properties };
    return {
      mode: this.getName(),
      point: point,
      layerId: layer.id,
      color: color
    };
  }
}

export default PaintMode;
