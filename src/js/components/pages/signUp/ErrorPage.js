import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import style from 'page/signUp/error';

class ErrorPageComponent extends React.Component {
  render() {
    let title, description, actionText;
    switch (this.props.error) {
      case 'tokenExpired':
        title = 'Your token is expired already';
        description = 'Please sign up again.';
        actionText = 'Retry sign up';
        break;
      case 'userAlreadyCreated':
        title = 'You are already registered.';
        description = 'Please login from login form';
        actionText = 'Back to login';
        break;
      default:
        title = 'System Error happend';
        description = "We're very sorry to incovenient.";
        actionText = 'Back to TOP';
        break;
    }

    return (
      <div className={ style.container }>
        <div className={ style.card + " " + style.textCenter }>
          <span className={ style.card__title }>
            { title }
          </span>
          <p>{ description }</p>
          <Link to="/"
                className={ style.card__action + " " + style.textLink }>
            { actionText }
          </Link>
        </div>
      </div>
    );
  }
}

const ErrorPage = connect(
  state => {
    return {
      ...state.pages.signUp.validate
    }
  }
)(ErrorPageComponent);

export default ErrorPage;
