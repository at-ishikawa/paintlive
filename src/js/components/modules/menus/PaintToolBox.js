import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PaintToolBoxActions from '../../../actions/paint/paintToolBox';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class PaintToolBoxComponent extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader
          title="Paint Toolbox"
          showExpandableButton={ true }
          />
        <CardText expandable={ true }>
          Paint ToolBox
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
