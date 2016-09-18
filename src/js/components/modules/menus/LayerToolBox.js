import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayerToolBoxActions from '../../../actions/paint/layer';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

// SCSS
import '_module/_menus/_layerToolBox.scss';

class LayerToolBoxComponent extends React.Component {
  render() {
    return (
      <Card expanded={ true }
            expandable={ true }>
        <CardHeader
          title="Layer Toolbox"
          showExpandableButton={ true }
          />
        <CardText className="layerToolBox__layerList" style={{ "padding": 0 }} expandable={ true }>
          <ul className="layerToolBox__layerList">
            { this.props.layers.map((function (layer, index) {
              var className = this.props.currentLayerIndex == index ? "isSelected" : "";
              return (
                <li className={ "layerToolBox__layerList__item " + className } onClick={ () => { this.props.selectLayer(index) } }>
                  <TextField
                     className="layerToolBox__layerList__item__name"
                     value={ layer.name }
                     onChange={ (event) => { this.props.setLayerName(index, event.target.value) } }
                    />
                  <span className="layerToolBox__layerList__item__visible">
                    <Checkbox
                       labelPosition="left"
                       onCheck={ (event) => { this.props.setLayerVisible(index, event.target.checked) } }
                      checked={ layer.isVisible }
                      />
                  </span>
                </li>
              );
            }).bind(this)) }
          </ul>
        </CardText>
        <CardActions>
          <FlatButton label="Add" onClick={ this.props.addLayer }/>
          <FlatButton label="Remove" onClick={ this.props.removeLayer } />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layers: state.reducers.paint.layers,
    currentLayerIndex: state.reducers.paint.currentLayerIndex
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
