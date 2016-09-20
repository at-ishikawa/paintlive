import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintToolBoxActions from '../../../actions/paint/paintToolBox';
import { PenMode, SelectMode, PaintMode } from '../modes/';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class PaintToolBoxComponent extends React.Component {
  render() {
    return (
      <Card expanded={ true }
            expandable={ true }>
        <CardHeader
          title="Paint Toolbox"
          showExpandableButton={ true }
          />
        <CardText expandable={ true }>
          <ul>
            <li onClick={ () => ( this.props.setMode(new PenMode()) ) }>Pen</li>
            <li onClick={ () => ( this.props.setMode(new SelectMode()) ) }>Select</li>
            <li onClick={ () => ( this.props.setMode(new PaintMode()) ) }>Paint</li>
          </ul>
          <div>

          </div>
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators(PaintToolBoxActions, dispatch)
  }
};

const PaintToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintToolBoxComponent);

export default PaintToolBox;
