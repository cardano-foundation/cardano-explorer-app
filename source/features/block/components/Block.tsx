import { observer } from 'mobx-react-lite';

import styles from './Block.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Block = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Block);
