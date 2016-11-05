import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ImageListSection from '../images/ImageListSection';
import * as LogInActions from '../../../actions/auth/login';

class MyPageComponent extends React.Component {
  render() {
    const popularImages = [
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

    return (
      <div>
        <ImageListSection title="New Images"
                          images={ popularImages }
                          allUrl="/images/new"
                          />

        <ImageListSection title="Your Images"
                          images={ popularImages }
                          allUrl="/account/images"
                          isUserImageList={ true }
                          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(LogInActions, dispatch)
  };
}

const MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);

export default MyPage;
