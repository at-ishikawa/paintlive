import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PenOptionDialogActions from 'actions/penOptionDialog';
import Button from './ui/Button';
import Dialog from './ui/Dialog';
import Slider from './ui/Slider';

import style from "modules/penOptionDialog";

class PenOptionDialogComponent extends React.Component {

  componentDidMount() {
    this.changeLineWidth(this.props.paint.lineWidth);
  }

  changeLineWidth = (lineWidth) => {
    this.props.changeLineWidth(lineWidth);

    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, lineWidth / 2, 0, 2 * Math.PI, true);
    context.fill();
  }

  render () {
    return (
      <Dialog isVisible={ this.props.isShown }
              draggable={ false }
              header="Pen Option"
              className={ style.dialog }
      >
        <div className={ style.body }>
          <canvas ref="canvas"
                  className={ style.canvas }
                  width="32"
                  height="32" />
          <div>
            <div className={ style.slider }>
              <Slider min="1"
                      max="30"
                      value={ this.props.paint.lineWidth }
                      onChange={ (e) => this.changeLineWidth(e.target.value) } />
            </div>
            <div className={ style.penSize }>
              { this.props.paint.lineWidth }
            </div>
          </div>
        </div>
        <div className={ style.actions }>
          <Button onClick={ this.props.hidePenOptionDialog }>OK</Button>
        </div>
      </Dialog>
    );
  }
}

const PenOptionDialog = connect(
  (state) => ({
    ...state.penOptionDialog,
    paint: state.paint
  }),
  (dispatch) => ({
    ...bindActionCreators(PenOptionDialogActions, dispatch)
  })
)(PenOptionDialogComponent);

export default PenOptionDialog;
