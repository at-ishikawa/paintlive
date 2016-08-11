import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GoogleTagManager from '../GoogleTagManager';
import Env from 'Env';

import '_base/_base.scss';
import '_layout/_layout-container.scss';
import '_layout/_layout-main.scss';

class Container extends React.Component {
  render() {
    return (
      <div className="layout-container">
        <GoogleTagManager gtmId={Env.gtmId} />
        <Header />
        <main className="layout-main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Container;
