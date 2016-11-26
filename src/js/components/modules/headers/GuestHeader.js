import React from 'react';
import { Link } from 'react-router';

import style from 'module/header';

class GuestHeader extends React.Component {
  render() {
    return (
      <header className={ style.header }>
        <div className={ style.container }>
          <div className={ style.headerContainer }>
            <div className={ style.header__logo }>
              <Link to="/">
                SiteName
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default GuestHeader;
