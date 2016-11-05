import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';

class UserHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(context) {
    super(context);
  }

  handleActive = (tab) => {
    const url = tab.props['data-route']
    this.context.router.push(url);
  }

  render() {
    return (
      <header>
        <Tabs>
            <Tab label="TOP Icon"
                 data-route="/"
                 onActive={ this.handleActive }
                 />
            {/*
            <Tab label="Timeline"
                 data-route="/timeline"
                 onActive={ this.handleActive }
                 />
            */}
            <Tab label="Account"
                 data-route="/account"
                 onActive={ this.handleActive }
                 />
          </Tabs>
      </header>
    );
  }
}

export default UserHeader;
