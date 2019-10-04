import { observer } from 'mobx-react-lite';
import { Input } from 'react-polymorph/lib/components/Input';
import { IStakePoolsSearchProps } from '../types';
import styles from './StakePools.scss';

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
