import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import Paint from 'components/modules/Paint';
import Toolbar from 'components/modules/Toolbar';
import PaintToolBox from 'components/modules/PaintToolBox';
import LayerToolBox from 'components/modules/LayerToolBox';

import * as PaintActions from 'actions/paint';
import style from "pages/painter";

class PainterPageComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const query = this.props.location.query || {};
    if ('id' in query) {
      this.props.loadImage(query.id);
    }
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
      <div className={ style.wrapper }>
        <DocumentMeta {...meta} />
        <Toolbar />

        <div className={ style.main }>
          {/*
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
          */}
          <div className={ style.editorContainer }>
            <div>
              <PaintToolBox />
            </div>

            <div className={ style.paintContainer }>
              <Paint />
            </div>
            <div>
              <LayerToolBox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const PainterPage = connect(
  () => ({}),
  dispatch => {
    return {
      ...bindActionCreators(PaintActions, dispatch)
    }
  }
)(PainterPageComponent);

export default PainterPage;
