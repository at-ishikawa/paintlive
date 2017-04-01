import React from 'react';
import UAParser from 'ua-parser-js';

import style from 'modules/ui/menuItem';

class MenuItem extends React.Component {

  static defaultProps = {
    shortcutKey: null,
    controlMetaKey: null
  };

  constructor(props) {
    super(props);
    const parser = new UAParser();
    this.isMac = parser.getResult().os.name == 'Mac OS';
  }

  componentDidMount() {
    if (this.props.shortcutKey) {
      document.addEventListener('keydown', this.handleShortcutKey);
    }
  }

  componentWillUnmount() {
    if (this.props.shortcutKey) {
      document.removeEventListener('keydown', this.handleShortcutKey, false);
    }
  }

  handleShortcutKey = (event) => {
    const char = String.fromCharCode(event.keyCode);
    const controlMetaKey = this.isMac ? event.metaKey : event.ctrlKey;

    if (!(this.props.shortcutKey == char.toLowerCase())) {
      return;
    }

    if (!(this.props.controlMetaKey && controlMetaKey)) {
      return;
    }

    event.preventDefault();
    this.props.onClick();
  }

  render() {
    const keys = [];
    if (this.props.shortcutKey) {
      if (this.props.controlMetaKey) {
        keys.push(this.isMac ? '\u{2318}' : 'Ctrl-');
      }
      keys.push(this.props.shortcutKey.toUpperCase());
    }

    return (
      <li className={ this.props.className }
          onClick={ this.props.onClick }>
        { this.props.children }
        { keys.length > 0 &&
          <div className={ style.shortcutKey }>
            { keys.join("") }
          </div>
        }
      </li>
    );
  }
}

export default MenuItem;
