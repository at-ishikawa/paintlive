import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintToolBoxActions from '../../../actions/editor/paintToolBox';
import ImageEdit from "material-ui/svg-icons/image/edit";
import ImageColorize from "material-ui/svg-icons/image/colorize";
import ImagePhotoSizeSelectSmall from "material-ui/svg-icons/image/photo-size-select-small";
import { PenMode, SelectMode, PaintMode } from './modes/';

import "_module/_editor/_paintToolBox";

class PaintToolBoxComponent extends React.Component {
  render() {
    return (
      <div className="toolBox">
        <span>Tool</span>
        <ul>
          <li className="toolBox__item isSelected"
              onClick={ () => ( this.props.setMode(new SelectMode()) ) }>
            <ImagePhotoSizeSelectSmall />
          </li>
          <li className="toolBox__item"
              onClick={ () => ( this.props.setMode(new PenMode()) ) }>
            <ImageEdit />
          </li>
          <li className="toolBox__item"
              onClick={ () => ( this.props.setMode(new PaintMode()) ) }>
            <ImageColorize />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators(PaintToolBoxActions, dispatch)
  }
};

const PaintToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintToolBoxComponent);

export default PaintToolBox;
