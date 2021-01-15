import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import { isEmpty } from 'lodash';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import styles from './AddressSummary.module.scss';
import { IToken } from '../../transactions/types';
import Tooltip, { ContentContainer } from '../../../widgets/tooltip/Tooltip';

export interface IAddressSummaryProps {
  address: string;
  title: string;
  transactionsCount: string;
}

export interface IPaymentAddressSummaryProps extends IAddressSummaryProps {
  finalBalance: string;
  tokensBalance?: IToken[];
}

export interface IStakeAddressSummaryProps extends IAddressSummaryProps {
  totalWithdrawn: string;
  totalWithdrawals: string;
}

type AddressSummaryProps =
  | IPaymentAddressSummaryProps
  | IStakeAddressSummaryProps;

function isPaymentAddress(
  props: AddressSummaryProps
): props is IPaymentAddressSummaryProps {
  return (props as IPaymentAddressSummaryProps).finalBalance !== undefined;
}

function isStakeAddress(
  props: AddressSummaryProps
): props is IStakeAddressSummaryProps {
  return (props as IStakeAddressSummaryProps).totalWithdrawn !== undefined;
}

const AddressSummary = (props: AddressSummaryProps) => {
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
          {isPaymentAddress(props) && (
            <>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>
                  {/* TODO: add DE and JA translation*/}
                  {translate('address.adaBalance')}
                </div>
                <div className={styles.infoValue}>{props.finalBalance} ADA</div>
              </div>
              {!isEmpty(props.tokensBalance) && (
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>
                    {/* TODO: add DE and JA translation*/}
                    {translate('address.tokensBalance')}
                  </div>
                  <div className={styles.infoValue}>
                    <div className={styles.tokenList}>
                      {props.tokensBalance!.map((b) => (
                        <span className={styles.token}>
                          <Tooltip
                            content={
                              <ContentContainer
                                label={translate('address.policyId')}
                                body={b.policyId}
                              />
                            }
                          >
                            {`${b.quantity} ${b.assetName}`}
                          </Tooltip>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {isStakeAddress(props) && (
            <>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>
                  {translate('withdrawals')}
                </div>
                <div className={styles.infoValue}>{props.totalWithdrawals}</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>
                  {translate('address.totalWithdrawn')}
                </div>
                <div className={styles.infoValue}>
                  {props.totalWithdrawn} ADA
                </div>
              </div>
            </>
          )}
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
