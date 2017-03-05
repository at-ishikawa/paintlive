import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PhotoshopPicker as ColorPicker } from 'react-color';
import * as PaintToolBoxActions from 'actions/paintToolBox';
import * as ColorPickerActions from 'actions/colorPicker';
import { PenMode, SelectMode, PaintMode } from './modes/';

import style from "modules/paintToolBox";

class PaintToolBoxComponent extends React.Component {
  componentDidMount() {
    this.props.setMode(new SelectMode());
  }

  render() {
    return (
      <div className={ style.toolBox }>
        <ul>
          <li className={ style.toolBox__item + (this.props.name == "Select" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new SelectMode()) ) }>
            <i className="material-icons">photo_size_select_small</i>
          </li>
          <li className={ style.toolBox__item + (this.props.name == "Pen" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new PenMode()) ) }>
            <i className="material-icons">edit</i>
          </li>
          <li className={ style.toolBox__item + (this.props.name == "Paint" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new PaintMode()) ) }>
            <i className="material-icons">colorize</i>
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
