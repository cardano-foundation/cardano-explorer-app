import styles from './UnmoderatedDataWarning.scss';
import { IUnmoderatedDataWarning } from '../types';

export default ({ onAcceptUnmoderatedData }: IUnmoderatedDataWarning) => (
  <div className={styles.unmoderatedDataWarningContainer}>
    NOOUPE
    <button onClick={onAcceptUnmoderatedData}>accept</button>
  </div>
);
