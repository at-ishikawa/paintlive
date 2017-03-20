import React from 'react';

import TextField from 'components/modules/ui/TextField';
import Checkbox from 'components/modules/ui/Checkbox';
import style from 'modules/layerToolBox';

class LayerToolBoxItem extends React.Component {
  render() {
    const { layer, index } = { ...this.props };
    var className = this.props.currentLayerIndex == index ? style.isSelected : "";

    return (
      <li className={ style.layerToolBox__layerList__item + " " + className }
          onClick={ () => { this.props.selectLayer(index) } }>
        <TextField
          className={ style.textField }
          value={ layer.name }
          name={ "layer_name_" + index }
          onChange={ (event) => { this.props.setLayerName(index, event.target.value) } }
        />
        <div className={ style.layerToolBox__layerList__item__visible }>
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

export default LayerToolBoxItem;
