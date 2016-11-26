import React from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Button from 'components/modules/ui/Button';
import Image from 'components/modules/ui/Image';
import style from 'page/accounts/profile';

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <section>
          <Card>
            <form onSubmit={ (e) => { e.preventDefault(); } }>
              <CardText>
                <div className={ style.inputForm }>
                  <div className={ style.thumbnail }>
                    <Image className={ style.thumbnail } />
                    <input type="file"
                           ref="thumbnail"
                           style={{ "display": "none" }}
                    />
                  </div>
                  <TextField
                    ref="username"
                    hintText="Username"
                    name="username"
                    onBlur={ (event) => { this.username = event.target.value; } }
                  />
                  <TextField
                    ref="email"
                    hintText="Email"
                    name="email"
                    onBlur={ (event) => { this.email = event.target.value; } }
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

export default ProfilePage;
