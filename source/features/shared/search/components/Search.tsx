import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';

import styles from './Search.scss';

export interface ISearchProps {
  triggerBlockSearch?: (id: string) => void;
}

const Search = (props: ISearchProps) => {
  const [blockIdValue, setBlockIdValue] = useState('');
  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Search</h2>
      <div className={styles.searchContent}>
        <Input
          className={styles.searchInput}
          placeholder="Search for epochs, blocks, addresses and transactions"
          value={blockIdValue}
          onChange={v => setBlockIdValue(v)}
          onKeyPress={e => {
            if (e.key === 'Enter' && props.triggerBlockSearch) {
              props.triggerBlockSearch(blockIdValue);
            }
          }}
        />
        <Button
          className={styles.searchButton}
          label={<div className={styles.searchButtonIcon} />}
          onClick={() => {
            if (props.triggerBlockSearch) {
              props.triggerBlockSearch(blockIdValue);
            }
          }}
        />
      </div>
    </div>
  );
};

export default observer(Search);
