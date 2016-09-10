import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class MainMenu extends React.Component {
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

export default MainMenu;
