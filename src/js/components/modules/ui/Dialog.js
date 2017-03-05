import React from 'react';
import Draggable from 'react-draggable';

import style from 'modules/ui/dialog';

class Dialog extends React.Component {
  render() {
    return (
      <div className={ style.dialog } style={{ "display": this.props.isVisible ? "block" : "none" }}>
        <Draggable
          zIndex={this.props.zIndex ? this.props.zIndex : 1}
          >
            <div>
              <div className={ style.dialog__header }>
                { this.props.header }
              </div>
              <div className={ style.dialog__body }>
                { this.props.children }
              </div>
            </div>
          </Draggable>
      </div>
    );
  }
}

export default Dialog;
