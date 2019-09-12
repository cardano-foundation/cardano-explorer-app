import { observer } from 'mobx-react-lite';

import styles from './Epoch.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Epoch = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Epoch);
