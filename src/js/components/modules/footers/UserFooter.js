import React from 'react';

import style from 'module/footer';

class UserFooter extends React.Component {
  render() {
    return (
      <footer className={ style.footer }>
        <div className={ style.container }>
          <div className={ style.footer__text }>
            Copyright (C) 2016 something All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  }
}

export default UserFooter;
