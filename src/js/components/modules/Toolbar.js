import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'components/modules/ui/Button';
import TextField from 'components/modules/ui/TextField';

import Dialog from './ui/Dialog';
import * as ToolbarActions from "actions/toolbar";
import * as PaintActions from "actions/paint";

import style from "modules/toolbar";

class ToolbarComponent extends React.Component {
  render() {

    let painting = this.props.paint.contexts.length > 0;

    return (
      <div>
        <ul className={ style.toolbar }>
          <li className={ style.menu }>
            <div className={ style.menu__title }>File</div>
            <ul className={ style.dropdownMenu }>
              <li className={ style.dropdownMenu__item }
                  onClick={ this.props.showNewImageDialog }>
                New
              </li>
              {/*
              <li className={ style.dropdownMenu__item }
                  onClick={ () => { this.props.saveImage(this.props.paint); } }>
                Save
              </li>
              */}
            </ul>
          </li>
          { painting &&
            <li className={ style.menu }>
              <div className={ style.menu__title }>Image</div>
              <ul className={ style.dropdownMenu }>
                <li className={ style.dropdownMenu__item }
                    onClick={ () => { this.refs.importImageFile.click() } }>
                  Import
                </li>
              </ul>
            </li>
          }
        </ul>
        <input ref="importImageFile" type="file" style={{ "display" : "none" }} onChange={ this.props.onImportImageMenuChange } />

        <Dialog
          isVisible={ this.props.isExportImageDialogShown }
          header="Export Image as ...">
          <div>
            <select onChange={ (event, key, payload) => { this.props.setExportImageFileType(payload) } } defaultValue={ this.props.exportImageFileType }>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
          <div>
            <Button
              disabled={ this.props.imageTypeErrorText }
              onClick={ () => {
                      this.props.exportImage({
                        fileType: this.props.exportImageFileType
                      });
                    } }>
              OK
            </Button>
            <Button
              onClick={ this.props.cancelExportImageDialog }>
              Cancel
            </Button>
          </div>
        </Dialog>

        <Dialog
          isVisible={ this.props.isNewImageDialogShown }
          header="New Image">
          <div className={ style.item }>
            Size:

            <TextField
              className={ style.sizeText }
              name="width"
              type="number"
              placeholder="Width"
              isError={ this.props.widthErrorText }
              value={ this.props.width }
              onChange={ (event) => { this.props.setWidthOnNewImageDialog(event.target.value); } }
              />
            X
            <TextField
              className={ style.sizeText }
              name="height"
              type="number"
              placeholder="Height"
              isError={ this.props.heightErrorText }
              value={ this.props.height }
              onChange={ (event) => { this.props.setHeightOnNewImageDialog(event.target.value); } }
              />
            <div className={ style.errorText }>{ this.props.widthErrorText }</div>
            <div className={ style.errorText }>{ this.props.heightErrorText }</div>
          </div>

          <div className={ style.actions }>
            <Button
              disabled={ this.props.widthErrorText || this.props.heightErrorText }
              onClick={ () => {
                      this.props.openNewImage({
                        width: this.props.width,
                        height: this.props.height
                      });
                    } }>
              OK
            </Button>
            <Button
              onClick={ this.props.cancelNewImageDialog }>
              Cancel
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.toolbar,
    paint: state.paint
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ToolbarActions, dispatch),
    ...bindActionCreators(PaintActions, dispatch),
    onImportImageMenuChange: (event) => {
      var files = event.target.files;
      if (!files.length) {
        return;
      }

      const file = files[0];
      const name = file.name.split(".").shift();
      const url = URL.createObjectURL(file);
      dispatch(PaintActions.importImage(name, url));
    }
  };
}

const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarComponent);

export default Toolbar;
