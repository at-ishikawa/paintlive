import React from 'react';

import style from 'module/header';

class UserHeader extends React.Component {
  render() {
    return (
      <header className={ style.header }>
        <div style={{ width: "1024px", "margin-left": "auto", "margin-right": "auto" }}>
          UserHeader
        </div>
      </header>
    );
  }
}

export default UserHeader;
