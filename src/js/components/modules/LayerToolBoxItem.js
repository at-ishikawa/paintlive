import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from 'actions/layer';

import TextField from 'components/modules/ui/TextField';
import Checkbox from 'components/modules/ui/Checkbox';
import style from 'modules/layerToolBoxItem';

class LayerToolBoxItemComponent extends React.Component {
  render() {
    const { index } = { ...this.props };
    const layer = this.props.layers[index];
    var className = this.props.currentLayerIndex == index ? style.isSelected : "";

    return (
      <li className={ style.item + " " + className }
          onClick={ () => { this.props.selectLayer(index) } }>
        <TextField
          className={ style.textField }
          value={ layer.name }
          name={ "layer_name_" + index }
          onChange={ (event) => { this.props.setLayerName(index, event.target.value) } }
        />
        <div className={ style.item__visible }>
          <Checkbox
            name={ "layer_is_visible_" + index }
            onChange={ (event) => { this.props.setLayerVisible(index, event.target.checked) } }
            defaultChecked={ layer.isVisible }
          />
        </div>
      </li>
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

const LayerToolBoxItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerToolBoxItemComponent);


export default LayerToolBoxItem;
