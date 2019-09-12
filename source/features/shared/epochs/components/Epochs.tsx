import { observer } from 'mobx-react-lite';

import styles from './Epochs.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Epochs = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Epochs);
