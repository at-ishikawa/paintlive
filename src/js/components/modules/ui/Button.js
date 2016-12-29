import React from 'react';

import style from 'modules/ui/button';

class Button extends React.Component {
  render() {
    let defaultProps = {
    };
    let styleTypeProps = {
      'positive': {
        className: style.button + " " + style['button--positive']
      },
      'neutral': {
        className: style.button + " " + style['button--neutral']
      },
      'action': {
        className: style.button + " " + style['button--action']
      }
    };
    const props = Object.assign({}, defaultProps, styleTypeProps['neutral'], styleTypeProps[this.props.styleType], this.props);

    return (
      <button
        { ...props }
        >
        { props.children }
      </button>
    );
  }
}

export default Button;
