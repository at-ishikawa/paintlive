import React from 'react';

import style from "modules/ui/slider";

class Slider extends React.Component {
  render() {
    const { className, children, ...props } = { ...this.props };

    return (
      <input className={ style.slider + " " + className } type="range" { ...props }>
        { children }
      </input>
    );
  }
}

export default Slider;
