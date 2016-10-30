import React from 'react';

import '_layout/_layout-header.scss';
import '_module/_header.scss';

class UserHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <div style={{ width: "1024px", "margin-left": "auto", "margin-right": "auto" }}>
          UserHeader
        </div>
      </header>
    );
  }
}

export default UserHeader;
