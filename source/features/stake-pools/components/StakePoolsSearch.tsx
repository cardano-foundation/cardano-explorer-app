import { observer } from 'mobx-react-lite';
import { Input } from 'react-polymorph/lib/components/Input';
import { IStakePoolsSearchProps } from '../types';
import styles from './StakePoolsSearch.scss';

const StakePoolsSearch = ({ search, onSearch }: IStakePoolsSearchProps) => {
  return (
    <div className={styles.stakePoolsSearchContainer}>
      <Input
        placeholder="Search for a specific stake pool"
        value={search}
        onChange={v => onSearch(v)}
      />
    </div>
  );
};
export default observer(StakePoolsSearch);
