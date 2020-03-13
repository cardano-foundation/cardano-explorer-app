import { debounce } from 'lodash';
import React, { Component } from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import { getFilteredStakePoolsList } from '../helpers';
import { IStakePoolProps, IStakePoolsProps } from '../types';
import styles from './StakePools.module.scss';
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
  public handleInputChange = (search: string) => {
    // @todo
  };
  public render() {
    const { translate } = useI18nFeature().store;
    const { selectedPoolId, search } = this.state;
    const { stakePoolsList } = this.props;
    const filteredStakePoolsList: Array<IStakePoolProps> = getFilteredStakePoolsList(
      stakePoolsList,
      search
    );
    return (
      <div className={styles.stakePoolsContainer}>
        <DividerWithTitle title={translate('stakePools.stakePoolsTitle')} />
        <StakePoolsSearch
          search={search}
          onSearch={this.handleSearch}
          onInputChange={this.handleInputChange}
        />
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
