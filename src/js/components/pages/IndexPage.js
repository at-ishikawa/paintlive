import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');
    this.props.setCanvasContext(this.context);
  }

  getCanvasPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    return point;
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
    const style = {
      width: '1024px',
      height: '512px',
      border: '1px solid'
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
          <br />

        <canvas ref={ (component) => this.canvas = component }
                width="1024"
                height="512"
                style={ style }
                onMouseDown={ this.onMouseDown }
                onMouseUp={ this.onMouseUp }
                onMouseMove={ this.onMouseMove }>
        </canvas>
      </div>
    )
  }
}

export default IndexPage;
