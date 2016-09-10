import CanvasMode from './CanvasMode';

class PenMode extends CanvasMode {
  constructor(context) {
    super();
    this.context = context;
  }

  getName() {
    return 'Pen Mode';
  }

  onMouseDown(point) {
    this.context.beginPath();
    this.context.moveTo(point.x, point.y);
  }

  onMouseUp() {
    this.context.closePath();
  }

  onMouseMove(point) {
    if (!this.isDragging) {
      return;
    }

    this.context.lineTo(point.x, point.y);
    this.context.stroke();
  }
}

export default PenMode;
