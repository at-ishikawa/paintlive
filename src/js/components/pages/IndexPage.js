import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import MainMenu from '../../containers/modules/menus/MainMenuContainer';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.canvases = [];
    this.contexts = [];
    this.currentLayerIndex = 0;
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

  onClick(event) {
    const point = this.getCanvasPoint(event);
    this.props.onClick(point);
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

  render() {
    const width = 128;
    const height = 64;

    this.props.init(width, height);

    const style = {
      width: '1280px',
      height: '640px',
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

        <MainMenu />

        <a ref={ (component) => this.downloadLink = component }
           onClick={ this.onSaveButtonClick }
           download="YourFilename.jpg">
           Download as image
        </a>
        <br />

        {Array(this.props.layerCount).fill(1).map((_, i) => (
            <canvas ref={ (component) => this.canvases[i] = component }
              width={ width }
              height={ height }
              style={ style }
              onClick={ this.onClick }
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
