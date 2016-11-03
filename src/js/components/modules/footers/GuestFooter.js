import React from 'react';

import style from 'module/footer';

class GuestFooter extends React.Component {
  render() {
    return (
      <footer className={ style.footer }>
        <div className={ style.container }>
            Footer
        </div>
      </footer>
    );
  }
}

export default GuestFooter;
