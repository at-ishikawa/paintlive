import React from 'react';
import DocumentMeta from 'react-document-meta';
import Env from 'Env';

class IndexPage extends React.Component {

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

    return (
      <div style={{ "display": "flex" }}>
        <DocumentMeta {...meta} />
      </div>
    )
  }
}

export default IndexPage;
