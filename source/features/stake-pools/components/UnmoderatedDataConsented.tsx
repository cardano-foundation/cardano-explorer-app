import Link from 'next/link';
import Container from '../../widgets/container/components/Container';
import { IUnmoderatedDataConcent } from '../types';
import styles from './UnmoderatedDataConsented.scss';

export default ({ onHideUnmoderatedData }: IUnmoderatedDataConcent) => (
  <div className={styles.unmoderatedDataConsentedContainer}>
    You have consented to view unmoderated stake pool data.&nbsp;
    <button onClick={onHideUnmoderatedData}>Hide the unmoderated data</button>.
  </div>
);
