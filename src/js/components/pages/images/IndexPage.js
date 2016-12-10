import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import * as ImageActions from '../../../actions/pages/images/index';
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
        creator: {
          username: '',
          thumnbnailPath: ''
        }
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

          <div className={ style.imageCard__actionBox }>
            <FlatButton
              style={{ margin: "0" }}
              className={ style.imageCard__actionBox__item }
              label="2000"
              icon={<i className="material-icons">favorite</i>}
              />
            <FlatButton
              style={{ margin: "0" }}
              className={ style.imageCard__actionBox__item }
              label="200"
              icon={ <i className="material-icons">person</i> }
              />
            <FlatButton
              style={{ margin: "0" }}
              className={ style.imageCard__actionBox__item }
              label="17"
              icon={<i className="material-icons">comment</i>}
              />
          </div>
          <div>
            <ul className={ style.commentsBox }>

              <li className={ style.commentBox + " " + style.linkBox }>
                <Link to="/">
                  <div className={ style.commentBox__thumbnail }>Image</div>
                  <div className={ style.commentBox__content }>
                    <div>
                      <div className={ style.commentBox__username }>User name</div>
                      <div className={ style.commentBox__time }>2016/11/10</div>
                    </div>
                    <p className={ style.commentBox__text }>This girl is really cute!</p>
                  </div>
                </Link>
              </li>
              <li className={ style.commentBox + " " + style.linkBox }>
                <Link to="/">
                  <div className={ style.commentBox__thumbnail }>Image</div>
                  <div className={ style.commentBox__content }>
                    <div>
                      <div className={ style.commentBox__username }>User name</div>
                      <div className={ style.commentBox__time }>2016/11/10</div>
                    </div>
                    <p className={ style.commentBox__text }>This girl is really cute!</p>
                  </div>
                </Link>
              </li>

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
    ...state.pages.images.index
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
