import React from 'react';
import Draggable from 'react-draggable';

import '_module/_dialog';

class Dialog extends React.Component {
  render() {
    return (
      <div className="dialog" style={{ "display": this.props.isVisible ? "block" : "none" }}>
        <Draggable
          zIndex={this.props.zIndex ? this.props.zIndex : 1}
          >
            <div>
              <div className="dialog__header">
                { this.props.header }
              </div>
              <div className="dialog__body">
                { this.props.children }
              </div>
              <div className="dialog__footer">
                { this.props.footer }
              </div>
            </div>
          </Draggable>
      </div>
    );
  }
}

export default Dialog;
