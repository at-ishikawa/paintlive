import React from 'react';
import Draggable from 'react-draggable';

import style from 'modules/ui/dialog';

class Dialog extends React.Component {
  render() {
    const defaultProps = {
      zIndex: 1,
      draggable: true
    }
    const { className, zIndex, draggable, isVisible, header, children, ...props } = {
      ...defaultProps,
      ...this.props
    };
    let onStart = draggable ? () => {} : () => false;

    return (
      <div className={ style.dialog + " " + className } style={{ "display": isVisible ? "block" : "none" }}
           { ...props }>
        <Draggable
          zIndex={ zIndex }
          onStart={ onStart }
          >
            <div>
              <div className={ style.dialog__header }>
                { header }
              </div>
              <div className={ style.dialog__body }>
                { children }
              </div>
            </div>
          </Draggable>
      </div>
    );
  }
}

export default Dialog;
