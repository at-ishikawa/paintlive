import React from 'react';

import style from 'module/header';

class GuestHeader extends React.Component {
  render() {
    return (
      <header className={ style.header }>
        <div className={ style.container }>
          Guestheader
        </div>
      </header>
    );
  }
}

export default GuestHeader;
