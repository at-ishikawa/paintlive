import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import SelectField from 'material-ui/SelectField';
import TextField from 'components/modules/ui/TextField';

import Dialog from '../ui/Dialog';
import * as ToolbarActions from "../../../actions/editor/toolbar";
import * as PaintActions from "actions/editor/paint";

import style from "module/editor/toolbar";

class MainMenuComponent extends React.Component {
  render() {
    return (
      <div className={ style.toolbar }>

        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <IconMenu className={ style.menu }
                      iconButtonElement={ <FlatButton>File</FlatButton> }
                      >
              <MenuItem primaryText="New" onTouchTap={ this.props.showNewImageDialog } />
              <MenuItem primaryText="Save" onTouchTap={ () => { this.props.saveImage(this.props.paint); } } />
            </IconMenu>
            <IconMenu className={ style.menu }
                      iconButtonElement={ <FlatButton>Image</FlatButton> }
               >
              <MenuItem primaryText="Import" onTouchTap={ () => { this.refs.importImageFile.click(); } } />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <input ref="importImageFile" type="file" style={{ "display" : "none" }} onChange={ this.props.onImportImageMenuChange } />

        <Dialog
          isVisible={ this.props.isExportImageDialogShown }
          header="Export Image as ..."
          footer={
              <div>
                <FlatButton
                    label="OK"
                    disabled={ this.props.imageTypeErrorText }
                    onClick={ () => {
                      this.props.exportImage({
                        fileType: this.props.exportImageFileType
                      });
                    } } />
                <FlatButton
                    label="Cancel"
                    onClick={ this.props.cancelExportImageDialog } />
              </div>
          }>
          <div>
            <SelectField value={ this.props.exportImageFileType } onChange={ (event, key, payload) => { this.props.setExportImageFileType(payload) } }>
              <MenuItem value="png" primaryText="PNG" />
              <MenuItem value="jpeg" primaryText="JPEG" />
            </SelectField>
          </div>
        </Dialog>

        <Dialog
          isVisible={ this.props.isNewImageDialogShown }
          header="New Image"
          footer={
              <div>
                <FlatButton
                    label="OK"
                    disabled={ this.props.widthErrorText || this.props.heightErrorText }
                    onClick={ () => {
                      this.props.openNewImage({
                        width: this.props.width,
                        height: this.props.height
                      });
                    } } />
                <FlatButton
                    label="Cancel"
                    onClick={ this.props.cancelNewImageDialog } />
              </div>
          }>
          <div>
            <TextField
              name="width"
              type="number"
              placeholder="Example: 1024"
              floatingLabelText="Width (px):"
              isError={ this.props.widthErrorText }
              value={ this.props.width }
              onChange={ (event) => { this.props.setWidthOnNewImageDialog(event.target.value); } }
              />
            <div>{ this.props.widthErrorText }</div>
          </div>
          <div>
            <TextField
              name="height"
              type="number"
              placeholder="Example: 768"
              floatingLabelText="Height (px):"
              value={ this.props.height }
              onChange={ (event) => { this.props.setHeightOnNewImageDialog(event.target.value); } }
              />
            <div>{ this.props.heightErrorText }</div>
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

const MainMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuComponent);

export default MainMenu;
