import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from 'actions/layer';
import { DragSource, DropTarget } from 'react-dnd';

import TextField from 'components/modules/ui/TextField';
import Checkbox from 'components/modules/ui/Checkbox';
import style from 'modules/layerToolBoxItem';

class LayerToolBoxItemComponent extends React.Component {
  render() {
    const { index } = { ...this.props };
    const layer = this.props.layers[index];
    var className = this.props.currentLayerIndex == index ? style.isSelected : "";

    return this.props.connectDropTarget(this.props.connectDragSource(
      <li className={ style.item + " " + className }
          onClick={ () => { this.props.selectLayer(index) } }>
        <TextField
          className={ style.textField }
          value={ layer.displayName }
          name={ "layer_name_" + index }
          onChange={ (event) => { this.props.changeLayerName(index, event.target.value) } }
          onBlur={ (event) => { this.props.setLayerName(index, event.target.value) } }
        />
        <div className={ style.item__visible }>
          <Checkbox
            name={ "layer_is_visible_" + index }
            onChange={ (event) => { this.props.setLayerVisible(index, event.target.checked) } }
            checked={ layer.isVisible }
          />
        </div>
      </li>
    ));
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

const dndType = 'layer';
const LayerToolBoxItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(DragSource(dndType, {
  beginDrag: (props) => {
    return props;
  }
}, (connect) => ({
  connectDragSource: connect.dragSource()
}))(DropTarget(dndType, {
  hover: (target, monitor, component) => {
    const source = monitor.getItem();
    const layers = source.layers;
    const sourceIndex = layers.map(layer => layer.id).indexOf(source.layerId);
    const targetIndex = layers.map(layer => layer.id).indexOf(target.layerId);

    if (layers[sourceIndex].id == layers[targetIndex].id || sourceIndex == targetIndex) {
      return;
    }

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    component.props.moveLayer(layers[sourceIndex].id, layers[targetIndex].id);
  }
}, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(LayerToolBoxItemComponent)));

export default LayerToolBoxItem;
