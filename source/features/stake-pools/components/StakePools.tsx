import { observer } from 'mobx-react-lite';
import React, { Component } from 'react';
import { debounce } from 'lodash';
import styles from './StakePools.scss';
import {
  IStakePoolsProps,
  IStakePoolsListProps,
  IStakePoolProps,
} from '../types';
import DividerWithTitle from '../../shared/divider-with-title/components/DividerWithTitle';
import StakePoolsList from './StakePoolsList';
import StakePoolsSearch from './StakePoolsSearch';
import { getFilteredStakePoolsList } from '../helpers';

interface State {
  selectedPoolId: string;
  search: string;
}

const initialState = {
  selectedPoolId: '',
  search: '',
};

export default class StakePools extends Component<IStakePoolsProps, State> {
  state = {
    ...initialState,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleClose);
  }

  handleResize = () =>
    debounce(this.handleClose, 200, { leading: true, trailing: false });

  handleSelect = (selectedPoolId: string) => {
    return this.setState({
      selectedPoolId,
    });
  };

  handleClose = () => {
    this.setState({
      ...initialState,
    });
  };

  handleSearch = (search: string) => {
    this.setState({ search });
  };

  render() {
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
