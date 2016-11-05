import React from 'react';
import { Link } from 'react-router';

import ImageList from '../../modules/images/ImageList';

import style from 'module/images/imageListSection';

class ImageLisSection extends React.Component {
  render() {
    const { images, allUrl } = this.props;

    return (
      <section className={ style.imageListSection }>
        <div className={ style.imageListSection__title }>
          Other images for this user
        </div>
        <ImageList images={ images } />
        <div className={ style.imageListSection__actions }>
          <Link to={ allUrl }>
            <span className={ style.textLink }>
              See more
            </span>
          </Link>
        </div>
      </section>
    );
  }
}

export default ImageLisSection;
