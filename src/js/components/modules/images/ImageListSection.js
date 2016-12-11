import React from 'react';
import { Link } from 'react-router';

import ImageList from '../../modules/images/ImageList';

import style from 'module/images/imageListSection';

class ImageLisSection extends React.Component {
  render() {
    const { images, allUrl } = this.props;

    const link = images.length > 3 ?
      <div className={ style.imageListSection__actions }>
        <Link to={ allUrl }>
          <span className={ style.textLink }>
            See more
          </span>
        </Link>
      </div> : null;

    if (images.length <= 0) {
      return null;
    }

    return (
      <section className={ style.imageListSection }>
        <div className={ style.imageListSection__title }>
          { this.props.title }
        </div>
        <ImageList isUserImageList={ this.props.isUserImageList } images={ images } />
        { link }
      </section>
    );
  }
}

export default ImageLisSection;
