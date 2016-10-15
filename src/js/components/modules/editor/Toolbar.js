import React from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { PenMode, PaintMode } from './modes/';
import { setMode } from '../../../actions/editor/toolbar';

import "_module/_editor/_toolbar";

class MainMenuComponent extends React.Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <IconMenu className="menu"
                      iconButtonElement={ <FlatButton>File</FlatButton> }
               >
              <MenuItem primaryText="Export" onClick={ this.props.onSaveClick } />
            </IconMenu>
            <IconMenu className="menu"
                      iconButtonElement={ <FlatButton>Image</FlatButton> }
               >
              <MenuItem primaryText="Import" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <input ref="importImageFile" type="file" style={{ "display" : "none" }} onChange={ this.props.onImportImageMenuChange } />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  }
}

function saveImage() {
  return dispatch => {
    // console.log('saveImage immediate comment');
    request.post('http://localhost:8000/images')
      .set('Accept', 'application/json')
      .end((error, response) => {
        dispatch({
          error: error,
          message: response
        });
      });
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClick: () => {
      dispatch(saveImage());
    },
    onPenModeClick: () => {
      dispatch(setMode(new PenMode(null)));
    },
    onSelectModeClick: () => {

    },
    onPaintModeClick: () => {
      dispatch(setMode(new PaintMode(null)));
    },

    onImportImageMenuChange: (event) => {
      var files = event.target.files;
      if (!files.length) {
        return;
      }

      dispatch({
        type: 'import image',
        files: files
      });
    },

    onExportImageMenuClick: () => {
    }
  };
}

const MainMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuComponent);

export default MainMenu;
