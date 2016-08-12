import CanvasMode from './canvas-mode';

class SelectMode extends CanvasMode {
  constructor() {
    super();
  }

  getName() {
    return 'Selct Mode';
  }

  onMouseUp() {}
  onMouseDown() {}
  onMouseMove() {}
}

export default SelectMode;
