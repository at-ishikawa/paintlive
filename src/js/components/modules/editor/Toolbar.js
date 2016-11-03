import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import Dialog from '../ui/Dialog';
import * as ToolbarActions from "../../../actions/editor/toolbar";

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
              <MenuItem primaryText="Export" onTouchTap={ this.props.showExportImageDialog } />
            </IconMenu>
            <IconMenu className={ style.menu }
                      iconButtonElement={ <FlatButton>Image</FlatButton> }
               >
              <MenuItem primaryText="Import" />
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
              hintText="Example: 1024"
              floatingLabelText="Width (px):"
              errorText={ this.props.widthErrorText }
              value={ this.props.width }
              onChange={ (event) => { this.props.setWidthOnNewImageDialog(event.target.value); } }
              />
          </div>
          <div>
            <TextField
              name="height"
              type="number"
              hintText="Example: 768"
              floatingLabelText="Height (px):"
              errorText={ this.props.heightErrorText }
              value={ this.props.height }
              onChange={ (event) => { this.props.setHeightOnNewImageDialog(event.target.value); } }
              />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.toolbar
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ToolbarActions, dispatch),
    onImportImageMenuChange: (event) => {
      var files = event.target.files;
      if (!files.length) {
        return;
      }

      dispatch({
        type: 'import image',
        files: files
      });
    }
  };
}

const MainMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuComponent);

export default MainMenu;
