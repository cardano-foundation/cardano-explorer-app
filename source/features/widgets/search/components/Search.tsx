import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { BrandType } from '../../../../common/constants';
import styles from './Search.scss';

export interface ISearchProps {
  placeholder?: string;
  title?: string | boolean;
  brandType?: BrandType;
  onSearch: (value: string) => void;
}

const Search = (props: ISearchProps) => {
  const { placeholder, brandType, onSearch, title } = props;
  const [searchValue, setSearchValue] = useState('');
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedSearchContainer
      : styles.shrinkedSearchContainer;
  const searchContainerStyles = cx([styles.searchContainer, brandTypeStyle]);

  return (
    <div className={searchContainerStyles}>
      {title && <h2 className={styles.searchTitle}>{title}</h2>}
      <div className={styles.searchContent}>
        <Input
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchValue}
          onChange={v => setSearchValue(v)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onSearch(searchValue);
            }
          }}
        />
        <Button
          className={styles.searchButton}
          label={<div className={styles.searchButtonIcon} />}
          onClick={() => onSearch(searchValue)}
        />
      </div>
    </div>
  );
};

Search.defaultProps = {
  brandType: BrandType.ENLARGED,
  placeholder: 'Search for epochs, blocks, addresses and transactions',
  title: 'Search',
};

export default observer(Search);
