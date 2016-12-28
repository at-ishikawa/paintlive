import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import Paint from '../modules/editor/Paint';
import Toolbar from '../modules/editor/Toolbar';
import PaintToolBox from '../modules/editor/PaintToolBox';
import LayerToolBox from '../modules/editor/LayerToolBox';

import * as PaintActions from 'actions/editor/paint';
import style from "page/editor";

class EditorPageComponent extends React.Component {

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

const EditorPage = connect(
  () => ({}),
  dispatch => {
    return {
      ...bindActionCreators(PaintActions, dispatch)
    }
  }
)(EditorPageComponent);

export default EditorPage;
