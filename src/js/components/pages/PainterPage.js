import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';
import Paint from 'components/modules/Paint';
import Toolbar from 'components/modules/Toolbar';
import LayerToolBox from 'components/modules/LayerToolBox';
import PaintToolBox from 'components/modules/PaintToolBox';

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
      title: 'Paintlive - a toy painting tool',
      description: 'A tool to draw a simple painting',
      canonical: Env.appUrl + this.props.location.pathname,
      meta: {
        name: {
          keywords: 'paintlive,painting'
        }
      }
    };

    let painting = this.props.paint.contexts.length > 0;

    return (
      <div className={ style.wrapper }>
        <DocumentMeta {...meta} />

        <Toolbar />
        <main className={ style.main }>
          <ul className={ style.components }>
            { painting &&
              <li className={ style.menu }>
                <div className={ style.menu__title }>Tool</div>
                <div className={ style.menu__item }>
                  <PaintToolBox />
                </div>
              </li>
            }

            <li className={ style.paintContainer }>
              <Paint />
            </li>

            { painting &&
              <li className={ style.menu + " " + style.layerToolBox }>
                <div className={ style.menu__title }>Layers</div>
                <div className={ style.menu__item }>
                  <LayerToolBox />
                </div>
              </li>
            }
          </ul>
        </main>
      </div>
    )
  }
}

const PainterPage = connect(
  state => {
    return {
      paint: state.paint
    };
  },
  dispatch => {
    return {
      ...bindActionCreators(PaintActions, dispatch)
    }
  }
)(PainterPageComponent);

export default PainterPage;
