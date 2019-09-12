import { observer } from 'mobx-react-lite';

import styles from './Error.scss';

interface IProps {
  propFirst: string;
  propSecond: string;
}

const Error = (props: IProps) => {
  return <div className={styles.root}></div>;
};

export default observer(Error);
