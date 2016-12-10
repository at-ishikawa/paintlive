import FlatButton from "material-ui/FlatButton";
import { yellow400, grey400, orange400 } from 'material-ui/styles/colors';

import style from 'module/ui/button';

class Button extends FlatButton {
  render() {
    let defaultProps = {
      style: {
        margin: '8px'
      }
    };
    let typeProps = {
      'positive': {
        backgroundColor: yellow400,
        className: style.button + " " + style['button--positive']
      },
      'neutral': {
        backgroundColor: grey400,
        className: style.button + " " + style['button--neutral']
      },
      'action': {
        backgroundColor: orange400,
        className: style.button + " " + style['button--action']
      }
    };
    const props = Object.assign({}, defaultProps, typeProps['neutral'], typeProps[this.props.type], this.props);

    return (
      <FlatButton
        { ...props }
        />
    );
  }
}

export default Button;
