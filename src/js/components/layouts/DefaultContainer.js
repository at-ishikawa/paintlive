import React from 'react';
import { connect } from 'react-redux';

import GuestHeader from '../modules/headers/GuestHeader';
import GuestFooter from '../modules/footers/GuestFooter';
import UserHeader from '../modules/headers/UserHeader';
import UserFooter from '../modules/footers/UserFooter';

import containerStyle from 'layout/container';
import mainStyle from 'layout/main';

const style = Object.assign({}, containerStyle, mainStyle);

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
      <div className={ style.container }>
        { header }
        <main className={ style.main }>
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
