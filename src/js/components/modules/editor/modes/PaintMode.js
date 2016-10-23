import CanvasMode from './CanvasMode';

class PaintMode extends CanvasMode {
  getName() {
    return "Paint";
  }

  onClick(context, point) {
    this.context = context;
    const left = 0;
    const top = 0;
    const image = this.context.getImageData(left, top, this.width, this.height);
    const data = image.data;

    let maxLabel = 1;
    const labels = [];
    const labelPixels = [];
    for (let i = 0; i < data.length; i += 4) {
      // const x = (i / 4) % canvas.width;
      const y = Math.floor((i / 4) / this.width);

      if (labelPixels.length >= y) {
        labelPixels.push([]);
      }
      const red = data[i] << 24;
      const green = data[i + 1] << 16;
      const blue = data[i + 2] << 8;
      const alpha = data[i + 3];
      const rgba = red + green + blue + alpha;
      let label = null;
      if (!(rgba in labels)) {
        labels[rgba] = maxLabel;
        label = maxLabel;
        maxLabel++;
      } else {
        label = labels[rgba];
      }
      labelPixels[y].push(label);
    }

    let pointLabel = labelPixels[10][20];
    let changed = [];
    for (let i = 0; i < this.height; i++) {
      changed[i] = [];
      for (let j = 0; j < this.width; j++) {
        changed[i][j] = false;
      }
    }
    this.getData(changed, image, labelPixels, pointLabel, point.y, point.x);

    this.context.putImageData(image, 0, 0);
  }

  getData(changed, image, labelPixels, searchLabel, y, x) {
    if (y < 0 || x < 0 || y >= this.height || x >= this.width) {
      return;
    }
    if (changed[y][x]) {
      return;
    }

    if (labelPixels[y][x] != searchLabel) {
      return;
    }
    var index = (y * this.width + x) * 4;
    image.data[index] = 255;
    image.data[index + 1] = 0;
    image.data[index + 2] = 0;
    image.data[index + 3] = 255;

    changed[y][x] = true;
    this.getData(changed, image, labelPixels, searchLabel, y + 1, x);
    this.getData(changed, image, labelPixels, searchLabel, y - 1, x);
    this.getData(changed, image, labelPixels, searchLabel, y, x + 1);
    this.getData(changed, image, labelPixels, searchLabel, y, x - 1);
  }

  onMouseUp() {}
  onMouseDown() {}
  onMouseMove() {}

  getClickAction(point) {
    return {
      mode: this.getName(),
      point: point
    }
  }
}

export default PaintMode;
