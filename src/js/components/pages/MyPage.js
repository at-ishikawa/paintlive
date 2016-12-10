import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ImageListSection from 'components/modules/images/ImageListSection';
import * as ImageActions from 'actions/pages/myPage';

import style from 'page/myPage';

class MyPageComponent extends React.Component {

  componentWillMount() {
    this.props.readLatestImages();
    this.props.readUserImages(this.props.user);
  }

  render() {
    return (
      <div>
        <div className={ style.contents }>
          <ImageListSection title="New Images"
                            images={ this.props.myPage.latestImages }
                            allUrl="/images/new"
                            />

          <ImageListSection title="Your Images"
                            images={ this.props.myPage.userImages }
                            allUrl="/account/images"
                            isUserImageList={ true }
                            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    myPage: state.pages.myPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ImageActions, dispatch)
  };
};

const MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);

export default MyPage;
