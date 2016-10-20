import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from '../../../actions/editor/layer';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

// SCSS
import '_module/_editor/_layerToolBox.scss';

class LayerToolBoxComponent extends React.Component {
  render() {
    return (
      <div className="layerToolBox">
        <div className="layerToolBox__header">
          Layer
        </div>

        <ul className="layerToolBox__layerList">
          { this.props.layers.map((function (layer, index) {
            var className = this.props.currentLayerIndex == index ? "isSelected" : "";
            return (
              <li key={ index }
                  className={ "layerToolBox__layerList__item " + className }
                  onClick={ () => { this.props.selectLayer(index) } }>
                <TextField
                   className="layerToolBox__layerList__item__name"
                   value={ layer.name }
                   name={ "layer_name_" + index }
                   onChange={ (event) => { this.props.setLayerName(index, event.target.value) } }
                  />
                <span className="layerToolBox__layerList__item__visible">
                  <Checkbox
                     labelPosition="left"
                     name={ "layer_is_visible_" + index }
                     onCheck={ (event) => { this.props.setLayerVisible(index, event.target.checked) } }
                    defaultChecked={ layer.isVisible }
                    />
                </span>
              </li>
            );
          }).bind(this)) }
        </ul>

        <ul className="layerToolBox__footer">
          <li>
            <FlatButton label="Add" onClick={ this.props.addLayer }/>
          </li>
          <li>
            <FlatButton label="Remove" onClick={ this.props.removeLayer } />
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