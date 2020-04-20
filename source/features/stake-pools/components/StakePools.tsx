import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import { getFilteredStakePoolsList } from '../helpers';
import { IStakePoolProps, IStakePoolsProps } from '../types';
import styles from './StakePools.module.scss';
import StakePoolsList from './StakePoolsList';
import StakePoolsSearch from './StakePoolsSearch';

const StakePools = (props: IStakePoolsProps) => {
  const [search, setSearch] = useState('');
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const { translate } = useI18nFeature().store;
  const { stakePoolsList } = props;
  const filteredStakePoolsList: Array<IStakePoolProps> = getFilteredStakePoolsList(
    stakePoolsList,
    search
  );

  const handleClose = () => {
    setSearch('');
    setSelectedPoolId('');
  };
  const handleResize = () =>
    debounce(handleClose, 200, { leading: true, trailing: false });

  const handleInputChange = () => {
    // @TODO
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleClose);
    };
  }, []);

  return (
    <div className={styles.stakePoolsContainer}>
      <DividerWithTitle title={translate('stakePools.stakePoolsTitle')} />
      <StakePoolsSearch
        search={search}
        onSearch={setSearch}
        onInputChange={handleInputChange}
      />
      <StakePoolsList
        stakePoolsList={filteredStakePoolsList}
        selectedPoolId={selectedPoolId}
        onSelect={setSelectedPoolId}
        onClose={handleClose}
      />
    </div>
  );
};

export default StakePools;
