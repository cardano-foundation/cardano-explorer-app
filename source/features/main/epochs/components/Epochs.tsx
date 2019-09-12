import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { Block } from '../../../../../generated/typings/graphql-schema';

import styles from './index.scss';

interface IProps {
  triggerBlockSearch: (id: string) => void;
  searchResult: Pick<Block, 'id'> | null;
}

const Epochs = (props: IProps) => {
  const [blockIdValue, setBlockIdValue] = useState('');
  return (
    <div className={styles.root}>
      <h1>Block Search</h1>
      <Input
        placeholder="Enter block id …"
        value={blockIdValue}
        onChange={v => setBlockIdValue(v)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            props.triggerBlockSearch(blockIdValue);
          }
        }}
      />
      <Button
        className={styles.searchButton}
        label="search"
        onClick={() => props.triggerBlockSearch(blockIdValue)}
      />

      <h2>Result</h2>
      {JSON.stringify(props.searchResult)}
    </div>
  );
};

export default observer(Epochs);
