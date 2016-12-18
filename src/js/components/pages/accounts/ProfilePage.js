import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, CardActions, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import * as Actions from 'actions/pages/accounts/profile';
import Button from 'components/modules/ui/Button';
import Image from 'components/modules/ui/Image';
import style from 'page/accounts/profile';

class ProfilePageComponent extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if (this.props.isUpdated) {
      this.context.router.replace('/accounts');
    }
  }

  render() {
    return (
      <div className={ style.contents }>
        <section>
          <Card>
            <form onSubmit={ (e) => { e.preventDefault(); this.props.updateProfile(this.props.user.username, this.props.username, this.props.email, this.refs.thumbnail.files[0]) } }>
              <CardText>
                <div className={ style.inputForm }>
                  <div className={ style.thumbnail }
                       onClick={ () => this.refs.thumbnail.click() }>
                    <Image className={ style.thumbnail }
                           ref="image"
                           src={ this.props.thumbnailUrl } />
                    <input type="file"
                           ref="thumbnail"
                           style={{ "display": "none" }}
                           onChange={ (event) => {
                           this.props.pagesAccountProfileChangeField({
                               thumbnailUrl: window.URL.createObjectURL(event.target.files[0])
                           });
                        } }
                    />
                  </div>
                  <TextField
                    ref="username"
                    errorText={ this.props.errorMessages.username }
                    name="username"
                    value={ this.props.username }
                    onChange={ (event) => { this.props.pagesAccountProfileChangeField({ username: event.target.value }); } }
                  />
                  <TextField
                    ref="email"
                    errorText={ this.props.errorMessages.email }
                    name="email"
                    value={ this.props.email }
                    onChange={ (event) => { this.props.pagesAccountProfileChangeField({ email: event.target.value}); } }
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

const ProfilePage = connect(
  state => {
    return {
      ...state.pages.accounts.profile,
      user: state.user
    };
  },
  dispatch => {
    return {
      ...bindActionCreators(Actions, dispatch)
    };
  }
)(ProfilePageComponent);

export default ProfilePage;
