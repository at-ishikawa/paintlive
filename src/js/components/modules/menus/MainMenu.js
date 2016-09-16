import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { PenMode, PaintMode } from '../modes/';
import { setMode } from '../../../actions/canvas/toolbar';
import { addLayer } from '../../../actions/canvas/layer';

class MainMenuComponent extends React.Component {
  render() {
    return (
      <div>
        <MenuItem primaryText="File"
                  menuItems={[
                      <MenuItem primaryText="Save" />,
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

        <MenuItem primaryText="Layer"
          menuItems={[
            <MenuItem primaryText="addLayer" onClick={ this.props.onAddCanvasLayerClick } />
          ]} />

      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
    },

    onAddCanvasLayerClick: () => {
      dispatch(addLayer());
    }
  };
}

const MainMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuComponent);

export default MainMenu;
