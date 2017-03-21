import React from 'react';
import GoogleTagManager from '../modules/GoogleTagManager';
import Env from 'Env';
import DevTools from '../modules/DevTools';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Container extends React.Component {
  render() {
    let devTools = null;
    if (process.env.NODE_ENV === 'development') {
      devTools = <DevTools />;
    }

    return (
      <div>
        <GoogleTagManager gtmId={Env.gtmId} />
        { this.props.children }
        { devTools }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
