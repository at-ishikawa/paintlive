import React from 'react';
import { Link } from 'react-router';

import Image from '../ui/Image';

import style from 'module/images/imageList';

class ImageList extends React.Component {
  render() {
    return (
      <ul className={style.imageList}>
        { this.props.images.map(image => <li>
          <Link to={"/images/" + image.id}>
            <div className={style.imageCard}>
              <Image className={style.imageBox}
                     src={image.path}
                     />
              <div className={style.imageCard__info}>
                <span>{image.name}</span>
                { this.props.isUserImageList ? null : <div>
                  <i className={"material-icons " + style.imageCard__info__icon}>person</i>
                  <span>{image.user.username}</span>
                </div> }
                {/*
                 <div className={ style.imageCard__info__favorites }>
                 <i className={ "material-icons " + style.imageCard__info__icon }>star</i>
                 <span>{ image.favoriteCount }</span>
                 </div>
                 <div className={ style.imageCard__info__imageView }>
                 <i className={ "material-icons " + style.imageCard__info__icon }>pageview</i>
                 <span>{ image.viewCount }</span>
                 </div>
                 */}
              </div>
            </div>
          </Link>
        </li>)}
      </ul>
    );
  }
}

export default ImageList;
