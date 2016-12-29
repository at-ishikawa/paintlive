import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TextField from 'components/modules/ui/TextField';

import GuestHeader from '../modules/headers/GuestHeader';
import GuestFooter from '../modules/footers/GuestFooter';
import * as LogInActions from '../../actions/auth/logIn';
import * as SignUpActions from '../../actions/auth/signUp';
import Button from '../modules/ui/Button';

import style from 'page/topPage';

class TopPageComponent extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if (this.props.signUpForm.isPreregistered) {
      this.context.router.replace('/signup/complete');
    }
  }

  onTextFieldChange = (event) => {
    let input = {};
    input[event.target.name] = event.target.value;
    this.props.onInputChange(input);
  }

  render() {
    return (
      <div className={ style.wrapper }>
        <GuestHeader />
        <main className={ style.main }>
          <div className={ style.container }>

            <div className={ style.mainVisual }>
              Paint Live ! <br />
              Make and share your paints.<br />

              <Link className={ style.mainVisual__actionButton } to="/editor">
                <Button
                  styleType="positive">
                  Try to paint without save
                </Button>
              </Link>
            </div>

            <div className={ style.card }>
              <form onSubmit={ (e) => { e.preventDefault(); this.props.logIn(this.username, this.password); } }>
                <div className={ style.inputForm }>
                  <TextField
                    ref="username"
                    className={ style.inputForm__row }
                    placeholder="Username"
                    name="username"
                    onChange={ (event) => { this.username = event.target.value; } }
                  />
                  <TextField
                    ref="password"
                    className={ style.inputForm__row }
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={ (event) => { this.password = event.target.value; } }
                  />
                  <div className={ style.inputForm__actions }>
                    <Button
                      type="submit">
                      Log In
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <form onSubmit={ (e) => { e.preventDefault(); this.props.signUp(this.props.signUpForm.input); } }>
              <div className={ style.card }>
                <div className={ style.card__title }>
                  Sign Up
                </div>
                <div className={ style.inputForm }>
                  <div className={ style.inputForm__row }>
                    <TextField
                      placeholder="Username"
                      isError={ this.props.signUpForm.errorMessages.username }
                      name="username"
                      onBlur={ this.onTextFieldChange }
                    />
                    <div className={ style.inputForm__errorText }>
                      { this.props.signUpForm.errorMessages.username }
                    </div>
                  </div>
                  <div className={ style.inputForm__row }>
                    <TextField
                      placeholder="Email"
                      isError={ this.props.signUpForm.errorMessages.email }
                      type="email"
                      name="email"
                      onBlur={ this.onTextFieldChange }
                    />
                    <div className={ style.inputForm__errorText }>
                      { this.props.signUpForm.errorMessages.email }
                    </div>
                  </div>
                  <div className={ style.inputForm__row }>
                    <TextField
                      placeholder="Password"
                      isError={ this.props.signUpForm.errorMessages.password }
                      name="password"
                      type="password"
                      onBlur={ this.onTextFieldChange }
                    />
                    <div className={ style.inputForm__errorText }>
                      { this.props.signUpForm.errorMessages.password }
                    </div>
                  </div>
                  <div className={ style.inputForm__actions }>
                    <Button
                      styleType='positive'
                      onClick={ () => { this.props.signUp(this.props.signUpForm.input) } }>
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </main>
        <GuestFooter />
      </div>
    );
  }
}
TopPageComponent.defaultProps = {
  errorMessages: {},
  successMessages: {}
}

const mapStateToProps = (state) => {
  return {
    signUpForm: state.auth.signUpForm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(SignUpActions, dispatch),
    ...bindActionCreators(LogInActions, dispatch)
  };
}

const TopPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPageComponent);

export default TopPage;
