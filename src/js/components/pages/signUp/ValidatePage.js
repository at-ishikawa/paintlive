import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions/auth/signUp';

import style from 'page/topPage';

class ValidatePageComponent extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    try {
      this.props.validateToken(this.props.location.query.token);
    } catch (e) {
      this.context.router.replace('/signup/error');
    }
  }

  componentDidUpdate() {
    if (this.props.user.username.length > 0) {
      this.context.router.replace('/');
    }
    if (this.props.error.length > 0) {
      this.context.router.replace('/signup/error')
    }
  }

  render() {
    return (
      <div className={ style.container }>
        <div className={ style.mainVisual }>
          Checking a user...
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.pages.signUp.validate,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
};

const ValidatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatePageComponent);

export default ValidatePage;
