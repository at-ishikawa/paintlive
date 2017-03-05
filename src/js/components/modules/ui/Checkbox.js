import React from 'react';

import style from 'modules/ui/checkbox';

class Checkbox extends React.Component {
  render() {
    const { children, ...props } = { ...this.props };
    return (
      <label className={ style.checkboxLabel }>
        <input className={ style.checkbox }
               type="checkbox"
               { ...props } />
        { children }
      </label>
    )
  }
}

export default Checkbox;
