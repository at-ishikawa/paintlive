import React from 'react';

import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

import style from 'page/users/index';

class IndexPage extends React.Component {
  render() {
    const username = this.props.params.username;
    const users = {
      'Gahama san': {
        username: 'Gahama san',
        thumbnailPath: '/images/1466085974_1_10_124dbe5ac96045c64ed4af52fcc6fc4a.jpg'
      },
      'Devil woman': {
        username: 'Devil woman',
        thumbnailPath: '/images/2015112609464759fs.jpg'
      },
      'irohasu': {
        username: 'irohasu',
        thumbnailPath: '/images/CidYNL5UoAA2oZO.jpg'
      }
    };
    const images = [
      {
        id: 1,
        name: 'Yui Yuigahama',
        path: '/images/ss3.jpg',
        favoriteCount: 10000,
        viewCount: 271820,

        user: {
          username: 'Gahama san'
        }
      },
      {
        id: 2,
        name: 'Haruno Yukinoshita',
        path: '/images/81iWzz4DS7L._CR570,310,854,1590_.jpg',
        favoriteCount: 99999,
        viewCount: 99999,

        user: {
          username: 'Devil woman'
        }
      },
      {
        id: 3,
        name: 'Iroha Isshiki',
        path: '/images/CgLCUJ9UAAAcASF.jpg',
        favoriteCount: 99999,
        viewCount: 99999,

        user: {
          username: 'irohasu'
        }
      }
    ];

    const user = users[username];

    return (
      <div>
        <section className={ style.userBox }>
          <Image className={ style.thumbnailBox }
                 src={ user.thumbnailPath }
                 />
          <div className={ style.userBox__summary }>
            { user.username }
          </div>
        </section>

        <ImageListSection title="Other images for this user"
                          images={ images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ true }
                          />
      </div>
    )
  }
}

export default IndexPage;

