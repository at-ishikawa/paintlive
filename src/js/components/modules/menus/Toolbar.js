import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { PenMode, PaintMode } from '../modes/';
import { setMode } from '../../../actions/paint/toolbar';

class MainMenuComponent extends React.Component {
  render() {
    return (
      <div>
        <MenuItem primaryText="File"
                  menuItems={[
                      <MenuItem primaryText="Save" onClick={ this.props.onSaveClick } />,
                      <MenuItem primaryText="Open" />
                  ]}
        />
        <MenuItem primaryText="Mode"
         menuItems={[
           <MenuItem primaryText="Pen Mode" onClick={ this.props.onPenModeClick }/>,
           <MenuItem primaryText="Select Mode" onClick={ this.props.onSelectModeClick }/>,
           <MenuItem primaryText="Paint Mode" onClick={ this.props.onPaintModeClick }/>
         ]} />
        <MenuItem primaryText="View"
         menuItems={[
             <MenuItem primaryText="Import Image" onClick={ () => this.refs.importImageFile.click() } />,
             <MenuItem primaryText="Export Image" onClick={ this.props.onExportImageMenuClick } />
         ]} />
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
    setTimeout(() => {
      // console.log('saveImage async');
      dispatch({
      });
    }, 5000);
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
