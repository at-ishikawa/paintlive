import { connect } from 'react-redux';
import MainMenu from '../../../components/modules/menus/MainMenu';
import { ModeTransitions } from '../../../actions/canvas';

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPenModeClick: () => {
      dispatch({
        modeType: ModeTransitions.INIT,
        type: ModeTransitions.PEN_MODE
      });
    },
    onSelectModeClick: () => {

    },
    onPaintModeClick: () => {

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
      dispatch({
        type: 'add layer'
      });
    }
  };
}

const MainMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuContainer;
