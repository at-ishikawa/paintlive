import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onLoadButtonChange = this.onLoadButtonChange.bind(this);
    this.onAddLayerClick = this.onAddLayerClick.bind(this);
    this.onPaintButtonClick = this.onPaintButtonClick.bind(this);
    this.canvases = [];
    this.contexts = [];
    this.currentLayerIndex = 0;
    this.state = {
      layerCount: 1
    };
  }

  componentDidMount() {
    // this.contexts[this.currentLayerIndex] = this.canvases[this.currentLayerIndex].getContext('2d');
    // this.props.setCanvasContext(this.contexts[this.currentLayerIndex]);
  }

  componentDidUpdate() {
    if (this.contexts.length < this.canvases.length) {
      for (var i = this.contexts.length; i < this.canvases.length; i++) {
        this.contexts[i] = this.canvases[i].getContext('2d');
      }
      this.props.setCanvasContext(this.contexts[this.currentLayerIndex]);
    }
  }

  getCanvasPoint(event) {
    const rect = this.canvases[this.currentLayerIndex].getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    return point;
  }

  onSaveButtonClick() {
    // TODO Save Image as a merge
    var imageUrl = this.canvases[this.currentLayerIndex].toDataURL("image/png");
    this.downloadLink.href = imageUrl;
  }

  onLoadButtonChange(event) {
    var files = event.target.files;
    if (!files.length) {
      return;
    }

    var filePath = files[0];
    var fileReader = new FileReader();
    fileReader.onload = (function (event) {
      var url = event.target.result;

      var image = new Image();
      image.onload = (function() {
        this.contexts[0].drawImage(image, 0, 0);
      }).bind(this);

      image.src = url;
    }).bind(this);
    fileReader.readAsDataURL(filePath);
  }

  onMouseDown(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseDown(point);
  }

  onMouseUp(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseUp(point);
  }

  onMouseMove(event) {
    const point = this.getCanvasPoint(event);
    this.props.onMouseMove(point);
  }

  onAddLayerClick() {
    this.setState({
      layerCount: this.state.layerCount + 1
    });
  }

  onPaintButtonClick() {
    const left = 0;
    const top = 0;
    const context = this.contexts[this.currentLayerIndex];
    const canvas = this.canvases[this.currentLayerIndex];
    const image = context.getImageData(left, top, canvas.width, canvas.height);
    const data = image.data;

    let maxLabel = 1;
    const labels = [];
    const labelPixels = [];
    for (let i = 0; i < data.length; i += 4) {
      // const x = (i / 4) % canvas.width;
      const y = Math.floor((i / 4) / canvas.width);

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
    for (let i = 0; i < canvas.height; i++) {
      changed[i] = [];
      for (let j = 0; j < canvas.width; j++) {
        changed[i][j] = false;
      }
    }
    this.getData(changed, image, labelPixels, pointLabel, 10, 20, canvas);

    context.putImageData(image, 0, 0);
  }

  getData(changed, image, labelPixels, searchLabel, y, x, canvas) {
    if (y < 0 || x < 0 || y >= canvas.height || x >= canvas.width) {
      return;
    }
    if (changed[y][x]) {
      return;
    }

    if (labelPixels[y][x] != searchLabel) {
      return;
    }
    var index = (y * canvas.width + x) * 4;
    image.data[index] = 255;
    image.data[index + 1] = 0;
    image.data[index + 2] = 0;
    image.data[index + 3] = 255;

    changed[y][x] = true;
    this.getData(changed, image, labelPixels, searchLabel, y + 1, x, canvas);
    this.getData(changed, image, labelPixels, searchLabel, y - 1, x, canvas);
    this.getData(changed, image, labelPixels, searchLabel, y, x + 1, canvas);
    this.getData(changed, image, labelPixels, searchLabel, y, x - 1, canvas);
  }

  render() {
    const style = {
      width: '128px',
      height: '64px',
      border: '1px solid',
      position: 'absolute'
    };

    const meta = {
      title: 'Sample Title',
      description: 'Sample Description',
      canonical: Env.appUrl + this.props.location.pathname,
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'sample'
        }
      }
    };

    return (
      <div>
        <DocumentMeta {...meta} />
        Draw Page
        <br />
        Mode: { this.props.mode.getName() }
        <br />
        <button type="button" onClick={ this.props.onPenModeClick }>Pen Mode</button>
        <button type="button" name="paintButton" onClick={ this.onPaintButtonClick }>Paint Mode</button>
        <input type="file" name="load" onChange={ this.onLoadButtonChange } />
        <button type="button" name="addLayer" onClick={ this.onAddLayerClick }>Add Layer</button>

        <a ref={ (component) => this.downloadLink = component }
           onClick={ this.onSaveButtonClick }
           download="YourFilename.jpg">
           Download as image
        </a>
        <br />

        {Array(this.state.layerCount).fill(1).map((_, i) => (
            <canvas ref={ (component) => this.canvases[i] = component }
              width="128"
              height="64"
              style={ style }
              onMouseDown={ this.onMouseDown }
              onMouseUp={ this.onMouseUp }
          onMouseMove={ this.onMouseMove }>

            </canvas>
        ))}
      </div>
    )
  }
}

export default IndexPage;
