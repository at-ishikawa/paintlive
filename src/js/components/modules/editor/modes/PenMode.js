import CanvasMode from './CanvasMode';

class PenMode extends CanvasMode {
  getName() {
    return "Pen";
  }

  onMouseDown(context, point) {
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  onMouseUp(context) {
    context.closePath();
  }

  onMouseMove(context, point, isDragging) {
    if (!isDragging) {
      return;
    }

    context.lineTo(point.x, point.y);
    context.stroke();
  }
}

export default PenMode;
