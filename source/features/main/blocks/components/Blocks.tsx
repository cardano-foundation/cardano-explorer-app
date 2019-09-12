import { observer } from 'mobx-react-lite';

import styles from './Blocks.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Blocks = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Blocks);
