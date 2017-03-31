import CanvasMode from './CanvasMode';
import PenMode from './PenMode';

class EraserMode extends CanvasMode {

  constructor() {
    super();
    this.penMode = new PenMode();
  }

  getName = () => {
    return "Eraser";
  }

  getAction = (props) => {
    return {
      ...props,
      mode: this.getName(),
      strokeStyle: "rgba(255, 255, 255, 1.0)"
    };
  }

  getMouseUpAction = (properties) => {
    const props = this.penMode.getMouseUpAction(properties);
    return this.getAction(props);
  }

  getMouseDownAction = (properties) => {
    const props = this.penMode.getMouseDownAction(properties);
    return this.getAction(props);
  }

  getMouseMoveAction = (properties) => {
    if (!properties.isDragging) {
      return;
    }

    const props = this.penMode.getMouseMoveAction(properties);
    return this.getAction(props);
  }
}

export default EraserMode;
