import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { Component } from 'react';
import DividerWithTitle from '../../shared/divider-with-title/components/DividerWithTitle';
import { getFilteredStakePoolsList } from '../helpers';
import {
  IStakePoolProps,
  IStakePoolsListProps,
  IStakePoolsProps,
} from '../types';
import styles from './StakePools.scss';
import StakePoolsList from './StakePoolsList';
import StakePoolsSearch from './StakePoolsSearch';

interface IState {
  selectedPoolId: string;
  search: string;
}
const initialState = {
  search: '',
  selectedPoolId: '',
};
export default class StakePools extends Component<IStakePoolsProps, IState> {
  public state = {
    ...initialState,
  };
  public componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleClose);
  }
  public handleResize = () =>
    debounce(this.handleClose, 200, { leading: true, trailing: false });
  public handleSelect = (selectedPoolId: string) => {
    return this.setState({
      selectedPoolId,
    });
  };
  public handleClose = () => {
    this.setState({
      ...initialState,
    });
  };
  public handleSearch = (search: string) => {
    this.setState({ search });
  };
  public render() {
    const { selectedPoolId, search } = this.state;
    const { stakePoolsList } = this.props;
    const filteredStakePoolsList: Array<
      IStakePoolProps
    > = getFilteredStakePoolsList(stakePoolsList, search);
    return (
      <div className={styles.stakePoolsContainer}>
        <DividerWithTitle title="Stake pools" />
        <StakePoolsSearch search={search} onSearch={this.handleSearch} />
        <StakePoolsList
          stakePoolsList={filteredStakePoolsList}
          selectedPoolId={selectedPoolId}
          onSelect={this.handleSelect}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
