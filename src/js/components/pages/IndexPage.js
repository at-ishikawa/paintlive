import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';

import DefaultContainer from '../layouts/DefaultContainer';
import MyPage from './MyPage';
import TopPage from '../modules/index/TopPage';

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
        name: {
          keywords: 'sample'
        }
      }
    };

    if (this.props.user.isLoggedIn) {
      return (
        <DefaultContainer>
          <DocumentMeta {...meta} />
          <MyPage>
          </MyPage>
        </DefaultContainer>
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
