import { observer } from 'mobx-react-lite';
import { Input } from 'react-polymorph/lib/components/Input';
import styles from './StakePools.scss';
import { IStakePoolsSearchProps } from '../types';

const StakePoolsSearch = ({ search, onSearch }: IStakePoolsSearchProps) => {
  return (
    <Input
      placeholder="Search for a specific stake pool"
      value={search}
      onChange={v => onSearch(v)}
    />
  );
};

export default observer(StakePoolsSearch);
