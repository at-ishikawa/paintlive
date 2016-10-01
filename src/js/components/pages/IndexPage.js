import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import MyPage from '../modules/index/MyPage';
import TopPage from '../modules/index/TopPage';
import Env from 'Env';

class IndexPageComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const meta = {
      title: 'Sample Title',
      description: 'Sample Description',
      canonical: Env.appUrl + this.props.location.pathname,
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'sample'
        }
      }
    };

    if (this.props.user.isLoggedIn) {
      return (
        <div>
          <DocumentMeta {...meta} />
          <MyPage>
          </MyPage>
        </div>
      );
    } else {
      return (
        <div>
          <DocumentMeta {...meta} />
          <TopPage>
          </TopPage>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = () => {
  return {
  };
}

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;
