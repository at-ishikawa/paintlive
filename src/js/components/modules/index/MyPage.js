import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LogInActions from '../../../actions/auth/login';

class MyPageComponent extends React.Component {
  render() {
    return (
      <main>
        Hello { this.props.user.username }!
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(LogInActions, dispatch)
  };
}

const MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);

export default MyPage;
