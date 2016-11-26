import React from 'react';
import { Link } from 'react-router';
import Image from '../ui/Image';

import textLink from 'module/ui/textLink';
import style2 from 'module/users/userList';
import listStyle from 'module/ui/list';

const style = Object.assign({}, style2, listStyle, textLink);

class UserListItem extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <li className={ style.list__item }>
        <Link className={ style.userList__item__container }
              to={ "/users/" + user.username }>
          <Image className={ style.userList__item__thumbnailBox }
                 src={ user.thumbnailPath }
          />
          <div className={ style.userList__item__info }>
            <span className={ style.textLink }>{ user.username }</span>
          </div>
        </Link>
      </li>
    );
  }
}

export default UserListItem;
