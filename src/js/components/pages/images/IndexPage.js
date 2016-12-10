import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import * as ImageActions from '../../../actions/pages/images/index';
import Button from '../../modules/ui/Button';
import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';
import UserListItem from 'components/modules/users/UserListItem';

import style from 'page/images/index';

class IndexPageComponent extends React.Component {

  componentWillMount() {
    this.props.readImage(this.props.params.id);
  }

  render() {
    const image = this.props.image || {
        name: '',
        url: '',
        favorite_users_count: 0,
        creator: {
          username: '',
          thumnbnailPath: '',
          follower_users_count: 0
        },
        comments: []
      };

    return (
      <div className={ style.contents }>
        <section className={ style.imageCard }>
          <span className={ style.imageCard__title }>
            { image.name }
          </span>
          <Image className={ style.imageBox }
                 src={ image.url }
                 />

          <UserListItem user={ image.creator }
          />

          { !this.props.user.isLoggedIn ? null :
            <div className={ style.imageCard__actionBox }>
              <Button
                type={ image.favorite_id ? 'action' : 'neutral' }
                style={{ margin: "0" }}
                className={ style.imageCard__actionBox__item }
                label={ new String(image.favorite_users_count)  }
                icon={<i className="material-icons">favorite</i>}
                onClick={ () => image.favorite_id ? this.props.unfavoriteImage(image.id, image.favorite_id) : this.props.favoriteImage(image.id) }
              />
              <FlatButton
                style={{ margin: "0" }}
                className={ style.imageCard__actionBox__item }
                label={ new String(image.creator.followers_count) }
                icon={ <i className="material-icons">person</i> }
              />
              <FlatButton
                style={{ margin: "0" }}
                className={ style.imageCard__actionBox__item }
                label={ new String(image.comments.length) }
                icon={<i className="material-icons">comment</i>}
              />
            </div>
          }
          <div>
            <ul className={ style.commentsBox }>
              { image.comments.map(comment =>
                <li className={ style.commentBox + " " + style.linkBox }>
                  <Link className={ style.commentBox__link } to={"/users/" + comment.user.username }>
                    <div className={ style.commentBox__thumbnail }>Image</div>
                    <div className={ style.commentBox__content }>
                      <div className={ style.commentBox__content__headline }>
                        <div className={ style.commentBox__username }>{ comment.user.username }</div>
                        <div className={ style.commentBox__time }>{ new Date(comment.created_at).toLocaleDateString() }</div>
                      </div>
                      <p className={ style.commentBox__text }>{ comment.text }</p>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>

        <ImageListSection title={ "Other images for this user" }
                          images={ this.props.userImages.filter((userImage) => { return userImage.id != image.id }) }
                          allUrl={ "/user/" + image.creator.username + "/images" }
                          isUserImageList={ true }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.pages.images.index,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ImageActions, dispatch)
  };
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;
