import React from 'react';
import { LocalizedLink } from '../../features/navigation/ui/LocalizedLink';
import styles from './ShowMoreButtonDecorator.module.scss';

export interface IShowMoreButtonDecorator {
  href: string;
  label: string;
  isHidden?: boolean;
  children: React.ReactNode;
}

const ShowMoreButtonDecorator = (props: IShowMoreButtonDecorator) => (
  <>
    {props.children}
    {!props.isHidden && (
      <div className={styles.root}>
        <LocalizedLink href={props.href}>
          <span className={styles.showMoreButton}>{props.label}</span>
        </LocalizedLink>
      </div>
    )}
  </>
);

export default ShowMoreButtonDecorator;
