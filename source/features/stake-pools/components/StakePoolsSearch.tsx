import { observer } from 'mobx-react-lite';
import { useI18nFeature } from '../../i18n/context';
import Search from '../../search/ui/Search';
import { IStakePoolsSearchProps } from '../types';
import styles from './StakePoolsSearch.module.scss';

const StakePoolsSearch = ({
  onSearch,
  onInputChange,
}: IStakePoolsSearchProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.stakePoolsSearchContainer}>
      <Search
        placeholder={translate('stakePools.stakePoolsSearch')}
        onSearch={(v: string) => onSearch(v)}
        onInputChange={(v: string) => onInputChange(v)}
        title={false}
      />
    </div>
  );
};
export default observer(StakePoolsSearch);
