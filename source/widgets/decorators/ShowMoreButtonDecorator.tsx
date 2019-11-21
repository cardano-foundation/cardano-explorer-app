import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import styles from './ShowMoreButtonDecorator.scss';

export interface IShowMoreButtonDecorator {
  label: string;
  isHidden?: boolean;
  onClick?: (...params: any[]) => void;
  children: React.ReactNode;
}

const ShowMoreButtonDecorator = (props: IShowMoreButtonDecorator) => (
  <>
    {props.children}
    {!props.isHidden && (
      <div className={styles.root}>
        <Button
          className={styles.showMoreButton}
          label={props.label}
          onClick={props.onClick}
        />
      </div>
    )}
  </>
);

export default ShowMoreButtonDecorator;
