import React from 'react';
import { Link } from 'react-router';

import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

import style from 'page/images/index';

class IndexPageComponent extends React.Component {
  render() {
    const images = {
      1: {
        id: 1,
        name: 'Yui Yuigahama',
        path: '/images/ss3.jpg',
        favoriteCount: 10000,
        viewCount: 271820,

        user: {
          username: 'Gahama san',
          thumbnailPath: '/images/1466085974_1_10_124dbe5ac96045c64ed4af52fcc6fc4a.jpg'
        }
      },
      2: {
        id: 2,
        name: 'Haruno Yukinoshita',
        path: '/images/81iWzz4DS7L._CR570,310,854,1590_.jpg',
        favoriteCount: 99999,
        viewCount: 99999,

        user: {
          username: 'Devil woman',
          thumbnailPath: '/images/2015112609464759fs.jpg'
        }
      },
      3: {
        id: 3,
        name: 'Iroha Isshiki',
        path: '/images/CgLCUJ9UAAAcASF.jpg',
        favoriteCount: 99999,
        viewCount: 99999,

        user: {
          username: 'irohasu',
          thumbnailPath: '/images/CidYNL5UoAA2oZO.jpg'
        }
      }
    };

    const image = images[this.props.params.id];

    return (
      <div>
        <section className={ style.imageCard }>
          <span className={ style.imageCard__title }>
            { image.name }
          </span>
          <Image className={ style.imageBox }
                 src={ image.path }
                 />
          <div>
            <Link className={ style.userBox }
                  to={ "/users/" + image.user.username }>
              <Image className={ style.userBox__thumbnailBox }
                     src={ image.user.thumbnailPath }
                     />
              <div className={ style.userBox__info }>
                <span className={ style.textLink }>{ image.user.username }</span>
              </div>
            </Link>
          </div>
        </section>

        <ImageListSection title={ "Other images for this user" }
                          images={ Object.values(images) }
                          allUrl={ "/user/" + image.user.username + "/images" }
                          isUserImageList={ true }
        />
      </div>
    );
  }
}

export default IndexPageComponent;
