import Link from 'next/link';
import Container from '../../../widgets/container/Container';
import { IUnmoderatedDataWarning } from '../types';
import styles from './UnmoderatedDataWarning.module.scss';

export default ({ onAcceptUnmoderatedData }: IUnmoderatedDataWarning) => (
  <div className={styles.unmoderatedDataWarningContainer}>
    <Container>
      <div className={styles.contentTop}>
        <h2>
          <b>Warning:</b> Stake pool data is not moderated
        </h2>
        <p>
          Stake pool ticker symbols, titles, descriptions and websites are not
          moderated and may contain inappropriate content.
        </p>
        <p>
          This information is provided and hosted by stake pool operators and it
          is not in control of entities running this website.
        </p>
        <p>Do you want to see unmoderated content?</p>
      </div>
      <div className={styles.contentBottom}>
        <Link href="/">
          <a>Leave this page</a>
        </Link>
        <button onClick={onAcceptUnmoderatedData}>
          Yes, show unmoderated content
        </button>
      </div>
    </Container>
  </div>
);
