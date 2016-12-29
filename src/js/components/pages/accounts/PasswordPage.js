import React from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';

import TextField from 'components/modules/ui/TextField';
import Button from 'components/modules/ui/Button';

import style from 'page/topPage';


class PasswordPage extends React.Component {
  render() {
    return (
      <div className={ style.contents }>
        <section>
          <Card>
            <form onSubmit={ (e) => { e.preventDefault(); } }>
              <CardText>
                <div className={ style.inputForm }>
                  <TextField
                    className={ style.inputForm__row }
                    type="password"
                    ref="password"
                    placeholder="Password"
                    name="password"
                    onBlur={ (event) => { this.password = event.target.value; } }
                  />
                  <TextField
                    className={ style.inputForm__row }
                    type="password"
                    placeholder="The same password"
                    name="password_confirmation"
                    onBlur={ (event) => { this.passwordConfirmation = event.target.value; } }
                  />
                </div>
              </CardText>
              <CardActions>
                <div className={ style.inputForm__actions }>
                  <Button
                    type="submit"
                    label="Complete"
                  />
                </div>
              </CardActions>
            </form>
          </Card>
        </section>
      </div>
    );
  }
}

export default PasswordPage;
