import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import MainMenu from '../modules/menus/MainMenu';
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
      <div>
        <DocumentMeta {...meta} />
        Draw Page
        <br />
        Mode: { this.props.currentMode ? this.props.currentMode.getName() : 'Unset' }
        <br />

        <MainMenu />

        <a ref={ (component) => this.downloadLink = component }
           onClick={ this.onSaveButtonClick }
           download="YourFilename.jpg">
           Download as image
        </a>
        <br />

        <Paint />

      </div>
    )
  }
}

export default IndexPage;
