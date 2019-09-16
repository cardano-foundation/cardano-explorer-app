import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { Block } from '../../../../../generated/typings/graphql-schema';

import styles from './Search.scss';

export interface ISearchProps {
  triggerBlockSearch?: (id: string) => void;
  searchResult?: Pick<Block, 'id'> | null;
}

const Search = (props: ISearchProps) => {
  const [blockIdValue, setBlockIdValue] = useState('');
  return (
    <div className={styles.root}>
      <h1>Search</h1>
      <Input
        placeholder="Enter block id …"
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
        label="search"
        onClick={() => {
          if (props.triggerBlockSearch) {
            props.triggerBlockSearch(blockIdValue);
          }
        }}
      />

      <h2>Result</h2>
      {props.searchResult}
    </div>
  );
};

export default observer(Search);
