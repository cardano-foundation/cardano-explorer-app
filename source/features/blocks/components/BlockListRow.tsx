import moment from 'moment';
import React, { Component } from 'react';
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

interface IState {
  showBlocksSlotsIcon: boolean;
}
const initialState = {
  showBlocksSlotsIcon: false,
};

export default class BlockListRow extends Component<
  IBlockListRowProps,
  IState
> {
  public state = {
    ...initialState,
  };

  public render() {
    const { showBlocksSlotsIcon } = this.state;
    const {
      block,
      createdAt,
      createdBy,
      epoch,
      output,
      size,
      transactions,
    } = this.props;

    return (
      <div className={styles.blockListRowContainer}>
        <div className={styles.epoch}>{epoch}</div>
        <div className={styles.blocksSlots}>
          {block}
          {showBlocksSlotsIcon && <span className={styles.blocksSlotsIcon} />}
        </div>
        <div className={styles.createdAt}>
          {moment(createdAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
        <div className={styles.transactions}>{transactions}</div>
        <div className={styles.output}>{output}</div>
        <div className={styles.size}>{size}</div>
        <div className={styles.createdBy}>{createdBy}</div>
      </div>
    );
  }
}
