import { observer } from 'mobx-react-lite';
import Search from '../../search/ui/Search';
import { IStakePoolsSearchProps } from '../types';
import styles from './StakePoolsSearch.module.scss';

const StakePoolsSearch = ({
  onSearch,
  onInputChange,
}: IStakePoolsSearchProps) => {
  return (
    <div className={styles.stakePoolsSearchContainer}>
      <Search
        placeholder="Search for a specific stake pool"
        onSearch={(v: string) => onSearch(v)}
        onInputChange={(v: string) => onInputChange(v)}
        title={false}
      />
    </div>
  );
};
export default observer(StakePoolsSearch);
