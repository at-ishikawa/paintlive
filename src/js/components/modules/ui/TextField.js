import React from 'react';

import style from 'modules/ui/textField';

class TextField extends React.Component {
  render() {
    const defaultProps = {
      type: 'text'
    };
    const { type, className, isError, children, ...props } = { ...defaultProps, ...this.props};

    let textClassNames = [
      style.textField
    ];
    if (className) {
      textClassNames.push(className);
    }
    if (isError) {
      textClassNames.push(style.isError);
    }

    return (
      <input className={ textClassNames.join(" ") }
             type={ type }
        { ...props }>
        { children }
      </input>
    );
  }
}

export default TextField;
