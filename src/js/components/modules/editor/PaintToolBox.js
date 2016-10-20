import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PhotoshopPicker as ColorPicker } from 'react-color';
import * as PaintToolBoxActions from '../../../actions/editor/paintToolBox';
import ImageEdit from "material-ui/svg-icons/image/edit";
import ImageColorize from "material-ui/svg-icons/image/colorize";
import ImagePhotoSizeSelectSmall from "material-ui/svg-icons/image/photo-size-select-small";
import { PenMode, SelectMode, PaintMode } from './modes/';

import "_module/_editor/_paintToolBox";

class PaintToolBoxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.state = {
      isColorPickerShown: false,
      color: {
        hex: "#fffff"
      },
      activeColor: {
        hex: "#fffff"
      }
    };
  }

  handleColorClick() {
    this.setState({
      isColorPickerShown: true
    });
  }

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

        <ul>
          <li className="toolBox__item" onClick={ this.handleColorClick } style={{ height: "8px", width: "8px", border: "1px solid", "backgroundColor": this.state.color.hex }}>
          </li>
        </ul>

        { !this.state.isColorPickerShown ?
          null :
          <div>
              <ColorPicker color={ this.state.activeColor.hex }
                           onAccept={ () => { this.setState({ isColorPickerShown: false, color: this.state.activeColor }); } }
                           onCancel={ () => { this.setState({ activeColor: this.state.color, isColorPickerShown: false }); } }
                           onChangeComplete={ (color) => { this.setState({ activeColor: color }) } }
                  />
          </div>
          }
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
