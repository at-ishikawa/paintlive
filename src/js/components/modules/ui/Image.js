import React from 'react';

import style from 'modules/ui/image';

class Image extends React.Component {
  render() {
    return (
      <div className={ style.imageBox + " " + this.props.className }
           >
        <img className={ style.imageBox__image }
             ref="image"
             src={ this.props.src ? this.props.src : "/images/nodata.jpg" }
          />
      </div>
    )
  }
}

export default Image;
