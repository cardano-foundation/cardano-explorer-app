import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { BrandType } from '../../../../common/constants';
import styles from './Search.scss';

export interface ISearchProps {
  triggerBlockSearch?: (id: string) => void;
  brandType?: BrandType;
}

const Search = (props: ISearchProps) => {
  const { brandType, triggerBlockSearch } = props;
  const [blockIdValue, setBlockIdValue] = useState('');
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedSearchContainer
      : styles.shrinkedSearchContainer;
  const searchContainerStyles = cx([styles.searchContainer, brandTypeStyle]);

  return (
    <div className={searchContainerStyles}>
      <h2 className={styles.searchTitle}>Search</h2>
      <div className={styles.searchContent}>
        <Input
          className={styles.searchInput}
          placeholder="Search for epochs, blocks, addresses and transactions"
          value={blockIdValue}
          onChange={v => setBlockIdValue(v)}
          onKeyPress={e => {
            if (e.key === 'Enter' && triggerBlockSearch) {
              triggerBlockSearch(blockIdValue);
            }
          }}
        />
        <Button
          className={styles.searchButton}
          label={<div className={styles.searchButtonIcon} />}
          onClick={() => {
            if (triggerBlockSearch) {
              triggerBlockSearch(blockIdValue);
            }
          }}
        />
      </div>
    </div>
  );
};

Search.defaultProps = {
  brandType: BrandType.ENLARGED,
};

export default observer(Search);
