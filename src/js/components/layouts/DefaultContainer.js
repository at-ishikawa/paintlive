import React from 'react';
import { connect } from 'react-redux';

import GuestHeader from '../modules/headers/GuestHeader';
import GuestFooter from '../modules/footers/GuestFooter';
import UserHeader from '../modules/headers/UserHeader';
import UserFooter from '../modules/footers/UserFooter';

import containerStyle from '_layout/_layout-container';
import mainStyle from '_layout/_layout-main';

class DefaultContainerComponent extends React.Component {
  render() {
    let header;
    let footer;

    if (this.props.user.isLoggedIn) {
      header = <UserHeader />;
      footer = <UserFooter />;
    } else {
      header = <GuestHeader />;
      footer = <GuestFooter />;
    }

    return (
      <div className={ containerStyle['layout-container'] }>
        { header }
        <main className={ mainStyle['layout-main'] }>
          {this.props.children}
        </main>
        { footer }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = () => {
  return {};
}

const DefaultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultContainerComponent);

export default DefaultContainer;
