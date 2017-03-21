import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from 'actions/layer';
import Button from 'components/modules/ui/Button';
import LayerToolBoxItem from './LayerToolBoxItem';

import style from 'modules/layerToolBox';

class LayerToolBoxComponent extends React.Component {
  render() {
    return (
      <div className={ style.layerToolBox }>
        <ul className={ style.layerToolBox__layerList}>
          { this.props.layers.map((layer, index) => {
            return (
              <LayerToolBoxItem key={ layer.id }
                                layerId={ layer.id }
                                index={ index } />
            );
          }) }
        </ul>

        <ul className={ style.layerToolBox__footer }>
          <li>
            <Button onClick={ this.props.addLayer }>
              Add
            </Button>
          </li>
          <li>
            <Button onClick={ this.props.removeLayer } >
              Remove
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layers: state.paint.layers,
    currentLayerIndex: state.paint.currentLayerIndex
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators(LayerToolBoxActions, dispatch)
  }
};

const LayerToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerToolBoxComponent);

export default LayerToolBox;
