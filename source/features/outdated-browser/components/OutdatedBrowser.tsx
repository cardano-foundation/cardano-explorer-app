import { observer } from 'mobx-react-lite';

import styles from './OutdatedBrowser.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const OutdatedBrowser = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(OutdatedBrowser);
