import React from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MyPageComponent extends React.Component {
  render() {
    return (
      <main>
        Succeeded to log in.
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = () => {
  return {
  };
}

const MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);

export default MyPage;

