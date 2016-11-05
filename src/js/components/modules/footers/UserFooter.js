import React from 'react';

import style from 'module/footer';

class UserFooter extends React.Component {
  render() {
    return (
      <footer className={ style.footer }>
        <div className={ style.container }>
          UserFooter
        </div>
      </footer>
    );
  }
}

export default UserFooter;
