import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PhotoshopPicker as ColorPicker } from 'react-color';
import * as PaintToolBoxActions from '../../../actions/editor/paintToolBox';
import * as ColorPickerActions from '../../../actions/editor/colorPicker';
import ImageEdit from "material-ui/svg-icons/image/edit";
import ImageColorize from "material-ui/svg-icons/image/colorize";
import ImagePhotoSizeSelectSmall from "material-ui/svg-icons/image/photo-size-select-small";
import { PenMode, SelectMode, PaintMode } from './modes/';

import style from "_module/_editor/_paintToolBox";

class PaintToolBoxComponent extends React.Component {
  componentDidMount() {
    this.props.setMode(new SelectMode());
  }

  render() {
    return (
      <div className={ style.toolBox }>
        <span>Tool</span>
        <ul>
          <li className={ style.toolBox__item + (this.props.name == "Select" ? " isSelected" : "") }
              onClick={ () => ( this.props.setMode(new SelectMode()) ) }>
            <ImagePhotoSizeSelectSmall />
          </li>
          <li className={ style.toolBox__item + (this.props.name == "Pen" ? " isSelected" : "") }
              onClick={ () => ( this.props.setMode(new PenMode()) ) }>
            <ImageEdit />
          </li>
          <li className={ style.toolBox__item + (this.props.name == "Paint" ? " isSelected" : "") }
              onClick={ () => ( this.props.setMode(new PaintMode()) ) }>
            <ImageColorize />
          </li>
        </ul>

        <ul>
          <li className={ style.toolBox__item + " " + style.toolBox__colorBox }
              onClick={ this.props.showColorPicker }
              style={{ "backgroundColor": this.props.colorPicker.selectedColor.hex }}>
          </li>
        </ul>

        { !this.props.colorPicker.isShown ?
          null :
          <div>
              <ColorPicker
                  color={ this.props.colorPicker.color.hex }
                  onAccept={ () => { this.props.changeColor(this.props.colorPicker.color) } }
                  onCancel={ () => { this.props.changeColor(this.props.colorPicker.selectedColor) } }
                  onChangeComplete={ (color) => { this.props.changeColorOnColorPicker(color) } }
                  />
          </div>
          }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.paintToolBox,
    colorPicker: state.colorPicker
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(PaintToolBoxActions, dispatch),
    ...bindActionCreators(ColorPickerActions, dispatch)
  }
};

const PaintToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintToolBoxComponent);

export default PaintToolBox;
