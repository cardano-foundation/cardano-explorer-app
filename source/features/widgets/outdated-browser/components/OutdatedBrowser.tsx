import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './OutdatedBrowser.scss';

export interface IOutdatedBrowserProps {
  text?: any;
}

const OutdatedBrowser = (props: IOutdatedBrowserProps) => {
  return <div className={styles.outdatedBrowserContainer}></div>;
};

export default observer(OutdatedBrowser);
