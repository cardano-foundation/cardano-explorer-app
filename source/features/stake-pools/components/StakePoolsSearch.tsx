import { observer } from 'mobx-react-lite';
import Search from '../../search/ui/Search';
import { IStakePoolsSearchProps } from '../types';
import styles from './StakePoolsSearch.scss';

const StakePoolsSearch = ({ search, onSearch }: IStakePoolsSearchProps) => {
  return (
    <div className={styles.stakePoolsSearchContainer}>
      <Search
        placeholder="Search for a specific stake pool"
        onSearch={(v: string) => onSearch(v)}
        title={false}
      />
    </div>
  );
};
export default observer(StakePoolsSearch);
