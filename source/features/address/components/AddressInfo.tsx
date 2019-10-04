import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './AddressInfo.scss';

export interface IAddressInfoProps {
  address: string;
  transactions: number;
  finalBalance: number;
}

const AddressInfo = (props: IAddressInfoProps) => (
  <div className={styles.addressInfoContainer}>
    <div className={styles.header}>
      <DividerWithTitle title="Address" />
    </div>
    <div className={styles.content}>
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Address</div>
          <div className={styles.infoValue}>{props.address}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transactions</div>
          <div className={styles.infoValue}>{props.transactions}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Final Balance</div>
          <div className={styles.infoValue}>{props.finalBalance} ADA</div>
        </div>
      </div>
      <div className={styles.qrcode}>
        <QRCode
          value={props.address}
          bgColor="#ffffff"
          fgColor="#000000"
          size={70}
        />
      </div>
    </div>
  </div>
);

export default observer(AddressInfo);
