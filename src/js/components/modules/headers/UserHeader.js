import React from 'react';

import style from 'module/ui/tab';

class UserHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  constructor(context) {
    super(context);
  }

  handleActive = (event) => {
    const url = event.currentTarget.dataset.route;
    this.context.router.push(url);
  }

  render() {
    const isAccountActive = this.context.location.pathname.startsWith('/accounts');
    const isTopActive = !isAccountActive;

    return (
      <header>
        <div className={ style.tabs }>
            <div className={ style.tab + (isTopActive ? " " + style.isActive : '') }
                 data-route="/"
                 onClick={ this.handleActive }
                 >
              TOP Icon
            </div>
            <div className={ style.tab + (isAccountActive ? " " + style.isActive : '') }
                 data-route="/accounts"
                 onClick={ this.handleActive }
                 >
              Account
            </div>
          </div>
      </header>
    );
  }
}

export default UserHeader;
