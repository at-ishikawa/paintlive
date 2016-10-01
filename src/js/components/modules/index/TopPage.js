import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import ActionDone from 'material-ui/svg-icons/action/done';
import { greenA700 } from 'material-ui/styles/colors';

import * as SignUpActions from '../../../actions/auth/signUp';

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
      <main>
        <Card>
          <CardHeader
             title="Sign Up"
             />
          <CardText>
            <div style={{ "display": "flex", "flex-direction": "column" }}>
              <div>
                <TextField
                   hintText="Username"
                   errorText={ this.props.errorMessages.username }
                   name="username"
                   onChange={ this.onTextFieldChange }
                   />
                {(() => {
                  if (this.props.successMessages.username) {
                    return <ActionDone color={ greenA700 } />
                  }
                })()}
              </div>
              <div>
                <TextField
                   hintText="Email"
                   errorText={ this.props.errorMessages.email }
                   name="email"
                   onChange={ this.onTextFieldChange }
                   />
                {(() => {
                  if (this.props.successMessages.email) {
                    return <ActionDone color={ greenA700 } />
                  }
                })()}
              </div>
              <div>
                <TextField
                   hintText="Password"
                   errorText={ this.props.errorMessages.password }
                   name="password"
                   type="password"
                   onChange={ this.onTextFieldChange }
                   />
                {(() => {
                  if (this.props.successMessages.password) {
                    return <ActionDone color={ greenA700 } />
                  }
                })()}
              </div>
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Sign Up" onClick={ () => { this.props.signUp(this.props.input) } } />
          </CardActions>
        </Card>
      </main>
    );
  }
}
TopPageComponent.defaultProps = {
  errorMessages: {},
  successMessages: {}
}

const mapStateToProps = (state) => {
  return state.auth.signUpForm;
}

const mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators(SignUpActions, dispatch)
  };
}

const TopPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPageComponent);

export default TopPage;
