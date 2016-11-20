import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Button from 'components/modules/ui/Button';
import * as PageActions from 'actions/pages/users/index';

import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

import style from 'page/users/index';

class IndexPageComponent extends React.Component {

  componentWillMount() {
    this.props.readUser(this.props.params.username);
  }

  render() {
    const user = Object.assign({}, {
      images: []
    }, this.props.user);

    return (
      <div>
        <section className={ style.userCard }>
          <div className={ style.userBox }>
            <Image className={ style.thumbnailBox }
                   src={ user.thumbnailPath }
            />
            <div className={ style.userBox__summary }>
              <div className={ style.userBox__summary__username }>
                { user.username }
              </div>
              <div>
                <Button
                  type="positive"
                >
                  <i className="material-icons">person</i>
                  Follow
                </Button>
              </div>
            </div>
          </div>
          <div className={ style.userActionBox + " " + style.linkBox }>
            <Link to={ "/users/" + user.username + "/followings" }>
              <div>Followings</div>
            </Link>
          </div>
        </section>

        <ImageListSection title="Other images for this user"
                          images={ user.images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ true }
                          />

        <ImageListSection title="Favorite images for this user"
                          images={ user.images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ false }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.pages.users.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(PageActions, dispatch)
  };
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;

