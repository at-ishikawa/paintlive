import React from 'react';

import style from 'page/topPage';

class CompletePage extends React.Component {
  render() {
    return (
      <div className={ style.container }>
        <div className={ style.mainVisual }>
          Email is sent to your email address!
          To complete a sign up, you could click a link on your email.
        </div>
      </div>
    );
  }
}

export default CompletePage;
