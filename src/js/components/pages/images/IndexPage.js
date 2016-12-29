import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as ImageActions from '../../../actions/pages/images/index';
import * as UserFollowActions from 'actions/users/follow';
import Button from '../../modules/ui/Button';
import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';
import TextField from 'components/modules/ui/TextField';
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
          followers_count: 0
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
              { this.props.user.username != image.creator.username &&
                <Button
                  styleType={ image.favorite_id ? 'action' : 'neutral' }
                  className={ style.imageCard__actionBox__item }
                  onClick={ () => image.favorite_id ? this.props.unfavoriteImage(image.id, image.favorite_id) : this.props.favoriteImage(image.id) }
                >
                  <i className="material-icons">favorite</i>
                  { image.favorite_users_count }
                </Button>
              }
              { this.props.user.username != image.creator.username &&
                <Button
                  styleType={ image.creator.following_id ? 'action' : 'neutral' }
                  className={ style.imageCard__actionBox__item }
                  onClick={ () => image.creator.following_id ? this.props.unfollowUser(image.creator.username, image.creator.following_id, image.id) : this.props.followUser(image.creator.username, image.id) }
                >
                  <i className="material-icons">person</i>
                  image.creator.followers_count
                </Button>
              }
              <Button
                styleType="neutral"
                className={ style.imageCard__actionBox__item }
                onClick={ () => window.location.href = "#commentForm" }
              >
                <i className="material-icons">comment</i>
                { image.comments.length }
              </Button>
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
            <form
              id="commentForm"
              className={ style.commentForm }
              onSubmit={ (e) => { e.preventDefault(); this.props.commentImage(image.id, this.comment); this.comment = ""; } }>
              <TextField
                multiLine={ true }
                placeholder="Comment"
                value={ this.comment }
                onChange={ (e) => { this.comment = e.target.value; } }
              />
              <div className={ style.commentForm__button }>
                <Button
                  styleType="neutral">
                  OK
                </Button>
              </div>
            </form>
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
    ...bindActionCreators(ImageActions, dispatch),
    ...bindActionCreators(UserFollowActions, dispatch)
  };
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;
