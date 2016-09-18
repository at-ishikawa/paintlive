import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import { Toolbar, PaintToolBox, LayerToolBox } from '../modules/menus';
import Paint from '../modules/Paint';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
  }

  onSaveButtonClick() {
    // TODO Save Image as a merge
    var imageUrl = this.canvases[this.props.currentLayerIndex].toDataURL("image/png");
    this.downloadLink.href = imageUrl;
  }

  render() {
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
      <div style={{ "display": "flex" }}>
        <DocumentMeta {...meta} />
        <div>
          <Toolbar />
        </div>

        <div style={{ "flex": 1 }}>
          Draw Page
          <br />
          Mode: { this.props.currentMode ? this.props.currentMode.getName() : 'Unset' }
          <br />

          <a ref={ (component) => this.downloadLink = component }
             onClick={ this.onSaveButtonClick }
             download="YourFilename.jpg">
             Download as image
          </a>
          <br />
          <Paint />
        </div>

        <div>
          <PaintToolBox />
          <LayerToolBox />
        </div>

      </div>
    )
  }
}

export default IndexPage;
