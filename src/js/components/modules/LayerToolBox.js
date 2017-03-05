import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from 'actions/layer';
import Button from 'components/modules/ui/Button';
import Checkbox from 'components/modules/ui/Checkbox';

import TextField from 'components/modules/ui/TextField';
import style from 'modules/layerToolBox';

class LayerToolBoxComponent extends React.Component {
  render() {
    return (
      <div className={ style.layerToolBox }>
        <ul className={ style.layerToolBox__layerList}>
          { this.props.layers.map((function (layer, index) {
            var className = this.props.currentLayerIndex == index ? style.isSelected : "";
            return (
              <li key={ index }
                  className={ style.layerToolBox__layerList__item + " " + className }
                  onClick={ () => { this.props.selectLayer(index) } }>
                <TextField
                  className={ style.textField }
                   value={ layer.name }
                   name={ "layer_name_" + index }
                   onChange={ (event) => { this.props.setLayerName(index, event.target.value) } }
                  />
                <div className={ style.layerToolBox__layerList__item__visible}>
                  <Checkbox
                     labelPosition="left"
                     name={ "layer_is_visible_" + index }
                     onCheck={ (event) => { this.props.setLayerVisible(index, event.target.checked) } }
                     defaultChecked={ layer.isVisible }
                    />
                </div>
              </li>
            );
          }).bind(this)) }
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
