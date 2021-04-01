import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { BrandType, SearchType } from '../../../constants';
const DeleteButton = require('../../../public/assets/images/delete.svg');
import styles from './Search.module.scss';

export interface ISearchProps {
  placeholder?: string;
  title?: string | boolean | null;
  brandType?: BrandType;
  onSearch: (value: string) => any;
  onInputChange: (value: string) => any;
  onRemoveSearchType?: () => any;
  searchType?: string;
}

const Search = (props: ISearchProps) => {
  const {
    placeholder,
    brandType,
    onSearch,
    onInputChange,
    onRemoveSearchType,
    title,
    searchType,
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedSearchContainer
      : styles.shrinkedSearchContainer;
  const searchTypeStyle =
    searchType === SearchType.EPOCH ||
    searchType === SearchType.BLOCK_BY_NUMBER ||
    searchType === SearchType.BLOCK_BY_SLOT_NUMBER
      ? styles.type
      : '';

  const searchInputStyles = cx([styles.searchInput, searchTypeStyle]);
  const searchContainerStyles = cx([styles.searchContainer, brandTypeStyle]);
  const submitSearch = () => {
    if (searchValue !== '') {
      onSearch(searchValue);
    }
  };
  return (
    <div className={searchContainerStyles}>
      {title && <h2 className={styles.searchTitle}>{title}</h2>}
      <div className={styles.searchContent}>
        {searchType && (
          <div className={styles.typeOfSearch}>
            <span className={styles.typeOfSearchText}>
              {searchType}
              {':'}
            </span>
            <span
              onClick={() => {
                setSearchValue('');
                if (onRemoveSearchType) {
                  onRemoveSearchType();
                }
              }}
            >
              <DeleteButton />
            </span>
          </div>
        )}
        <Input
          className={searchInputStyles}
          placeholder={placeholder}
          value={searchValue}
          onChange={(inputValue) => {
            setSearchValue(inputValue);
            onInputChange(inputValue);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              submitSearch();
            }
          }}
        />
        <Button
          className={styles.searchButton}
          label={
            <div className={styles.searchButtonIcon}>
              <div className={styles.searchButtonInner} />
            </div>
          }
          onClick={submitSearch}
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
