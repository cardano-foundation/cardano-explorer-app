import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';

import { useBlocks } from '../hooks';
import styles from './BlocksSearch.scss';

const BlocksSearch = () => {
  const { actions, api, store } = useBlocks();
  const [blockIdValue, setBlockIdValue] = useState('');
  const triggerBlockSearch = () =>
    actions.searchBlockById.trigger({ id: blockIdValue });
  return (
    <div className={styles.root}>
      <h1>Block Search</h1>
      <Input
        placeholder="Enter block id …"
        value={blockIdValue}
        onChange={v => setBlockIdValue(v)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            triggerBlockSearch();
          }
        }}
      />
      <Button
        className={styles.searchButton}
        label="search"
        onClick={triggerBlockSearch}
      />

      <h2>Result</h2>
      {JSON.stringify(store.searchedBlock)}
    </div>
  );
};

export default observer(BlocksSearch);
