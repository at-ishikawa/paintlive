class CanvasMode {
  setCanvasContext(context) {
    this.context = context;
  }

  setDragging(isDragging) {
    this.isDragging = isDragging;
  }

  onClick() {}
  onMouseUp() {}
  onMouseDown() {}
  onMouseMove() {}
}

export default CanvasMode;
