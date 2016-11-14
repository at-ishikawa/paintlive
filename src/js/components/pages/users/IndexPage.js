import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PageActions from 'actions/pages/users/index';

import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

import style from 'page/users/index';

class IndexPageComponent extends React.Component {

  componentWillMount() {
    this.props.readUser(this.props.params.username);
  }

  render() {
    const user = Object.assign({}, {
      images: []
    }, this.props.user);

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
                          images={ user.images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ true }
                          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.pages.users.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(PageActions, dispatch)
  };
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;

