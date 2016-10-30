import React from 'react';

import style from 'module/header.css';

class GuestHeader extends React.Component {
  render() {
    return (
      <header className={ style.header }>
        <div style={{ width: "1024px", "margin-left": "auto", "margin-right": "auto" }}>
          GuestHeader
        </div>
      </header>
    );
  }
}

export default GuestHeader;
