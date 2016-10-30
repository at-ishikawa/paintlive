import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import ActionDone from 'material-ui/svg-icons/action/done';
import { greenA700 } from 'material-ui/styles/colors';

import GuestHeader from '../headers/GuestHeader';
import GuestFooter from '../footers/GuestFooter';
import * as LogInActions from '../../../actions/auth/logIn';
import * as SignUpActions from '../../../actions/auth/signUp';

import style from 'module/index/topPage';

class TopPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }

  onTextFieldChange(event) {
    let input = {};
    input[event.target.name] = event.target.value;
    this.props.onInputChange(input);
  }

  render() {
    return (
      <div className={ style.container }>
        <GuestHeader />
        <main className={ style.main } style={{ "width": "1024px", "margin-left": "auto", "margin-right": "auto", "display": "flex", "flex-direction": "row", "margin-top": "64px" }}>
          <div style={{ "flexGrow": "1" }}>
            <Link to="/editor">
              <FlatButton
                label="Try to paint"
                />
            </Link>
          </div>

          <div style={{ "flexGrow": "1" }}>
            <Card style={{ "margin": "0 20% 5% 20%" }}>
              <CardHeader
                title="Log In"
                />
              <CardText>
                <div style={{ "display": "flex", "flex-direction": "column" }}>
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
                <FlatButton
                  label="Log In"
                  onClick={ () => { this.props.logIn(this.username, this.password); } }
                  />
              </CardActions>
            </Card>

            <Card style={{ "margin": "0 20% 5% 20%" }}>
              <CardHeader
                title="Sign Up"
                />
              <CardText>
                <div style={{ "display": "flex", "flex-direction": "column" }}>
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
                <FlatButton label="Sign Up" onClick={ () => { this.props.signUp(this.props.signUpForm.input) } } />
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
