import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PhotoshopPicker as ColorPicker } from 'react-color';
import * as PaintToolBoxActions from 'actions/paintToolBox';
import * as ColorPickerActions from 'actions/colorPicker';
import * as PenOptionDialogActions from 'actions/penOptionDialog';
// import { PenMode, SelectMode, PaintMode } from './modes/';
import { EraserMode, PaintMode, PenMode } from './modes/';
import PenOptionDialog from './PenOptionDialog';

import style from "modules/paintToolBox";

class PaintToolBoxComponent extends React.Component {
  changeLineWidth = (lineWidth) => {
    this.props.setLineWidth(lineWidth);

    const canvas = this.refs.penOptionCanvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, lineWidth / 2, 0, 2 * Math.PI, true);
    context.fill();
  }

  render() {
    return (
      <div className={ style.toolBox }>
        <ul>
          {/* TODO
          <li className={ style.toolBox__item + (this.props.name == "Select" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new SelectMode()) ) }>
            <i className="material-icons">photo_size_select_small</i>
          </li>
          */}
          <li className={ style.toolBox__item + (this.props.name == "Pen" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new PenMode()) ) }>
            <i className="material-icons">edit</i>
          </li>
          <li className={ style.toolBox__item + (this.props.name == 'Eraser' ? " " + style.isSelected : "") }
              onClick={ () => { this.props.setMode(new EraserMode()); } }>
            <i className="material-icons">edit</i>
          </li>
          <li className={ style.toolBox__item + (this.props.name == "Paint" ? " " + style.isSelected : "") }
              onClick={ () => ( this.props.setMode(new PaintMode()) ) }>
            <i className="material-icons">format_color_fill</i>
          </li>
        </ul>

        <ul>
          <li className={ style.toolBox__item + " " + style.toolBox__colorBox }
              onClick={ this.props.showColorPicker }
              style={{ "backgroundColor": this.props.colorPicker.selectedColor.hex }}>
          </li>
          <li className={ style.toolBox__item }
              onClick={ this.props.showPenOptionDialog }>
            <canvas ref="penOptionCanvas" width="24" height="24" />
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

        <PenOptionDialog changeLineWidth={ this.changeLineWidth } />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.paintToolBox,
    paint: state.paint,
    colorPicker: state.colorPicker
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(PaintToolBoxActions, dispatch),
    ...bindActionCreators(ColorPickerActions, dispatch),
    ...bindActionCreators(PenOptionDialogActions, dispatch)
  }
};

const PaintToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintToolBoxComponent);

export default PaintToolBox;
