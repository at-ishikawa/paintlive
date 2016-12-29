import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'components/modules/ui/Button';
import TextField from 'components/modules/ui/TextField';

import Dialog from './ui/Dialog';
import * as ToolbarActions from "actions/toolbar";
import * as PaintActions from "actions/paint";

import style from "modules/toolbar";

class MainMenuComponent extends React.Component {
  render() {
    return (
      <div className={ style.toolbar }>

        {/*
        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <IconMenu className={ style.menu }
                      iconButtonElement={ <Button>File</Button> }
                      >
              <MenuItem primaryText="New" onTouchTap={ this.props.showNewImageDialog } />
              <MenuItem primaryText="Save" onTouchTap={ () => { this.props.saveImage(this.props.paint); } } />
            </IconMenu>
            <IconMenu className={ style.menu }
                      iconButtonElement={ <Button>Image</Button> }
               >
              <MenuItem primaryText="Import" onTouchTap={ () => { this.refs.importImageFile.click(); } } />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
         */}
        <input ref="importImageFile" type="file" style={{ "display" : "none" }} onChange={ this.props.onImportImageMenuChange } />

        <Dialog
          isVisible={ this.props.isExportImageDialogShown }
          header="Export Image as ..."
          footer={
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
          }>
          <div>
            <select onChange={ (event, key, payload) => { this.props.setExportImageFileType(payload) } }>
              <option value="png" selected={ this.props.exportImageFileType == 'png' }>PNG</option>
              <option value="jpeg" selected={ this.props.exportImageFileType == 'jpeg' }>JPEG</option>
            </select>
          </div>
        </Dialog>

        <Dialog
          isVisible={ this.props.isNewImageDialogShown }
          header="New Image"
          footer={
              <div>
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
          }>
          <div>
            <label>Width(px):</label>
            <TextField
              name="width"
              type="number"
              placeholder="Example: 1024"
              isError={ this.props.widthErrorText }
              value={ this.props.width }
              onChange={ (event) => { this.props.setWidthOnNewImageDialog(event.target.value); } }
              />
            <div>{ this.props.widthErrorText }</div>
          </div>
          <div>
            <label>Height (px):</label>
            <TextField
              name="height"
              type="number"
              placeholder="Example: 768"
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
