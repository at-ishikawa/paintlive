import React from 'react';

import style from 'module/ui/image';

class Image extends React.Component {
  render() {
    return (
      <div className={ this.props.className }
           >
        <img className={ style.image }
             src={ this.props.src }
             alt={ this.props.alt ? this.props.alt : null }
        />
      </div>
    )
  }
}

export default Image;
