import { observer } from 'mobx-react-lite';
import moment from 'moment';
import styles from './BlockListRow.scss';

export interface IBlockListRowProps {
  block: number;
  createdAt: number;
  createdBy: string;
  epoch: number;
  output: number;
  size: number;
  slots: number;
  transactions: number;
}

const BlockListRow = (props: IBlockListRowProps) => (
  <div className={styles.blockListRowContainer}>
    <div className={styles.epoch}>{props.epoch}</div>
    <div className={styles.blocksSlots}>
      {props.block}
      <span className={styles.blocksSlotsIcon} />
    </div>
    <div className={styles.createdAt}>
      {moment(props.createdAt).format('YYYY/MM/DD HH:mm:ss')}
    </div>
    <div className={styles.transactions}>{props.transactions}</div>
    <div className={styles.output}>{props.output}</div>
    <div className={styles.size}>{props.size}</div>
    <div className={styles.createdBy}>{props.createdBy}</div>
  </div>
);

export default observer(BlockListRow);
