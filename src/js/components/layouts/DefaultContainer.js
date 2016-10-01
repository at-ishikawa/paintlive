import React from 'react';
import Header from '../modules/Header';
import Footer from '../modules/Footer';

import '_base/_base.scss';
import '_layout/_layout-container.scss';
import '_layout/_layout-main.scss';

class DefaultContainer extends React.Component {
  render() {
    return (
      <div className="layout-container">
        <Header />
        <main className="layout-main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default DefaultContainer;
