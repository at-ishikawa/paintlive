import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ImageList from '../images/ImageList';
import * as LogInActions from '../../../actions/auth/login';

import style from 'module/index/myPage';

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
        <section className={ style.section }>
          <div className={ style.section__title }>
            New Images
          </div>
          <ImageList images={ popularImages } />
          <div className={ style.section__actions }>
            <Link to="/images/new">
              <span className={ style.textLink }>
                See more
              </span>
            </Link>
          </div>
        </section>

        <section className={ style.section }>
          <div className={ style.section__title }>
            Your Images
          </div>
          <ImageList images={ popularImages } />
          <div className={ style.section__actions }>
            <Link to="/account/images">
              <span className={ style.textLink }>
                View your images
              </span>
            </Link>
          </div>
        </section>
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
