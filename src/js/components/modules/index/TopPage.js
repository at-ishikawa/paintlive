import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import ActionDone from 'material-ui/svg-icons/action/done';
import { greenA700 } from 'material-ui/styles/colors';

import GuestHeader from '../headers/GuestHeader';
import GuestFooter from '../footers/GuestFooter';
import * as LogInActions from '../../../actions/auth/logIn';
import * as SignUpActions from '../../../actions/auth/signUp';
import Button from '../ui/Button';

import style from 'module/index/topPage';

class TopPageComponent extends React.Component {

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
                  type="positive"
                  label="Try to paint without save"
                  />
              </Link>
            </div>

            <Card>
              <CardText>
                <div className={ style.inputForm }>
                  <TextField
                    ref="username"
                    hintText="Username"
                    name="username"
                    onChange={ (event) => { this.username = event.target.value; } }
                    />
                    <TextField
                      ref="password"
                      hintText="Password"
                      name="password"
                      type="password"
                      onChange={ (event) => { this.password = event.target.value; } }
                      />
                </div>
              </CardText>
              <CardActions>
                <div className={ style.inputForm__actions }>
                  <Button
                    label="Log In"
                    onClick={ () => { this.props.logIn(this.username, this.password); } }
                    />
                </div>
              </CardActions>
            </Card>

            <Card>
              <CardHeader
                title="Sign Up"
                />
              <CardText>
                <div className={ style.inputForm }>
                  <div>
                    <TextField
                      hintText="Username"
                      errorText={ this.props.signUpForm.errorMessages.username }
                      name="username"
                      onChange={ this.onTextFieldChange }
                      />
                    {(() => {
                      if (this.props.signUpForm.successMessages.username) {
                        return <ActionDone color={ greenA700 } />
                      }
                    })()}
                  </div>
                  <div>
                    <TextField
                      hintText="Email"
                      errorText={ this.props.signUpForm.errorMessages.email }
                      name="email"
                      onChange={ this.onTextFieldChange }
                      />
                    {(() => {
                      if (this.props.signUpForm.successMessages.email) {
                        return <ActionDone color={ greenA700 } />
                      }
                    })()}
                  </div>
                  <div>
                    <TextField
                      hintText="Password"
                      errorText={ this.props.signUpForm.errorMessages.password }
                      name="password"
                      type="password"
                      onChange={ this.onTextFieldChange }
                      />
                    {(() => {
                      if (this.props.signUpForm.successMessages.password) {
                        return <ActionDone color={ greenA700 } />
                      }
                    })()}
                  </div>
                </div>
              </CardText>
              <CardActions>
                <div className={ style.inputForm__actions } >
                  <Button
                    type='positive'
                    label="Sign Up"
                    onClick={ () => { this.props.signUp(this.props.signUpForm.input) } }
                    />
                </div>
              </CardActions>
            </Card>

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
