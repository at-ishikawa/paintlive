import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as ImageActions from '../../../actions/pages/images/index';
import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

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
      <div>
        <section className={ style.imageCard }>
          <span className={ style.imageCard__title }>
            { image.name }
          </span>
          <Image className={ style.imageBox }
                 src={ image.url }
                 />
          <div>
            <Link className={ style.userBox }
                  to={ "/users/" + image.creator.username }>
              <Image className={ style.userBox__thumbnailBox }
                     src={ image.creator.thumbnailPath }
                     />
              <div className={ style.userBox__info }>
                <span className={ style.textLink }>{ image.creator.username }</span>
              </div>
            </Link>
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
