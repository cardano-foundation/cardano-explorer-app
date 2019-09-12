import { observer } from 'mobx-react-lite';

import styles from './Address.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Address = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Address);
