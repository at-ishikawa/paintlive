import React from 'react';

import UserListItem from 'components/modules/users/UserListItem';

import style from 'page/images/index';

class FollowingPage extends React.Component {
  render() {
    const users = [
      {
        username: 'kaede',
        thumbnailPath: '/images/m1tgk007a_nf.jpg'
      },
      {
        username: 'rize',
        thumbnailPath: '/images/images.jpeg'
      },
      {
        username: 'rem',
        thumbnailPath: '/images/1466085974_1_10_124dbe5ac96045c64ed4af52fcc6fc4a.jpg'
      }
    ];
    return (
      <div className={ style.contents }>
        <section className={ style.imageCard }>
          <ul>
            { users.map(user => <UserListItem user={ user } />) }
          </ul>
        </section>
      </div>
    );
  }
}

export default FollowingPage;
