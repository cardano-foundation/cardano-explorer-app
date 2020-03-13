import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import styles from './AddressSummary.module.scss';

export interface IAddressSummaryProps {
  address: string;
  finalBalance: string;
  title: string;
  transactionsCount: string;
}

const AddressSummary = (props: IAddressSummaryProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.addressSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('address.summaryAddressLabel')}
            </div>
            <div className={styles.infoValue}>{props.address}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('address.summaryTransactionsLabel')}
            </div>
            <div className={styles.infoValue}>{props.transactionsCount}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('address.summaryBalanceLabel')}
            </div>
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
};

export default observer(AddressSummary);
