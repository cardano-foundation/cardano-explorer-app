import React from 'react';
import styles from './index.scss';

interface IProps {
  backgroundImageUrl?: string | null;
  title?: any;
}

const Header = (props: IProps) => {
  const imageContainerStyle = props.backgroundImageUrl
    ? {
        backgroundImage: `url(${props.backgroundImageUrl})`,
        backgroundSize: 'cover',
      }
    : {};

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer} style={imageContainerStyle}>
        <div className={styles.titleContainer}>{props.title}</div>
      </div>
    </div>
  );
};

export default Header;
