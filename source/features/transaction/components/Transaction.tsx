import { observer } from 'mobx-react-lite';

import styles from './Transaction.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Transaction = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Transaction);
