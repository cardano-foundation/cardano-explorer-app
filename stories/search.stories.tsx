import { storiesOf } from '@storybook/react';
import cx from 'classnames';
import { noop } from 'lodash';
import { useState } from 'react';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { BrandType } from '../source/constants';
import { SearchType } from '../source/features/search/store';
import NoSearchResult from '../source/features/search/ui/NoSearchResult';
import Search, { ISearchProps } from '../source/features/search/ui/Search';
import styles from '../source/features/search/ui/Search.module.scss';
import { ISearchSuggestionsProps } from '../source/features/search/ui/SearchSuggestions';
import { PaddingDecorator } from './support/PaddingDecorator';
const DeleteButton = require('../source/public/assets/images/delete.svg');
const ArrowRight = require('../source/public/assets/images/arrow-right.svg');

const SearchWithValue = (props: ISearchProps) =>
  React.createElement(() => {
    const {
      placeholder,
      brandType,
      onSearch,
      onInputChange,
      onRemoveSearchType,
      title,
      searchType,
    } = props;
    const [searchValue, setSearchValue] = useState('12');
    const brandTypeStyle =
      brandType === BrandType.ENLARGED
        ? styles.enlargedSearchContainer
        : styles.shrinkedSearchContainer;
    const searchTypeStyle =
      searchType === 'epoch' || searchType === 'block' ? styles.type : '';

    const searchContainerStyles = cx([styles.searchContainer, brandTypeStyle]);
    const searchInputStyles = cx([styles.searchInput, searchTypeStyle]);

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
                onSearch(searchValue);
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
            onClick={() => onSearch(searchValue)}
          />
        </div>
      </div>
    );
  });

const SearchWithValueSuggestion = (props: ISearchProps) =>
  React.createElement(() => {
    const {
      placeholder,
      brandType,
      onSearch,
      onInputChange,
      onRemoveSearchType,
      title,
      searchType,
    } = props;
    const [searchValue, setSearchValue] = useState('12');
    const brandTypeStyle =
      brandType === BrandType.ENLARGED
        ? styles.enlargedSearchContainer
        : styles.shrinkedSearchContainer;
    const searchTypeStyle =
      searchType === 'epoch' || searchType === 'block' ? styles.type : '';

    const searchContainerStyles = cx([styles.searchContainer, brandTypeStyle]);
    const searchInputStyles = cx([styles.searchInput, searchTypeStyle]);

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
                onSearch(searchValue);
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
            onClick={() => onSearch(searchValue)}
          />
        </div>
      </div>
    );
  });

const SearchWithSuggestions = (props: ISearchSuggestionsProps) =>
  React.createElement(() => {
    const { value, onSearchTypeSelect } = props;

    return (
      <>
        {value && (
          <div className={styles.searchSuggestionsContainer}>
            <ul className={styles.searchSuggestionsContent}>
              <li onClick={() => onSearchTypeSelect('epoch')}>
                <div>
                  Search for an epoch <span>{value}</span>
                </div>
                <ArrowRight />
              </li>
              <li onClick={() => onSearchTypeSelect('block')}>
                <div>
                  Search for a block <span>{value}</span>
                </div>
                <ArrowRight />
              </li>
            </ul>
          </div>
        )}
      </>
    );
  });

storiesOf('Search|Search Bar', module)
  .addDecorator((story) => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Search without value', () => (
    <Search onInputChange={noop} onSearch={noop} />
  ))
  .add('Search with value', () => (
    <SearchWithValue
      title="Search"
      brandType={BrandType.ENLARGED}
      onSearch={noop}
      onInputChange={noop}
    />
  ))
  .add('Search with suggestions', () => (
    <div>
      <SearchWithValue
        title="Search"
        brandType={BrandType.ENLARGED}
        onSearch={noop}
        onInputChange={noop}
      />
      <div className={styles.searchSuggestionsWrapper}>
        <SearchWithSuggestions value={'12'} onSearchTypeSelect={noop} />
      </div>
    </div>
  ))
  .add('Search with suggestion selected', () => (
    <div>
      <SearchWithValueSuggestion
        title="Search"
        searchType={'block'}
        brandType={BrandType.ENLARGED}
        onSearch={noop}
        onInputChange={noop}
      />
      <div className={styles.searchSuggestionsWrapper}>
        <SearchWithSuggestions value={''} onSearchTypeSelect={noop} />
      </div>
    </div>
  ));

storiesOf('Search|No Result', module)
  .addDecorator((story) => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Address', () => (
    <NoSearchResult
      searchQuery="Ae2tdPwUPEZBZTsRj7nGdvWQDTkqD9KLpCPpuZvjA1roL7KLDDVgkPU5S8g"
      searchType={SearchType.address}
    />
  ))
  .add('ID', () => (
    <NoSearchResult
      searchQuery="5f20df933584822601f9e3f8c02feb5eb252fe8cefb64d1317dc3d432e940ebb"
      searchType={SearchType.id}
    />
  ))
  .add('Number', () => (
    <NoSearchResult searchQuery="13231231415" searchType={SearchType.number} />
  ))
  .add('Unknown', () => (
    <NoSearchResult searchQuery="123abc" searchType={SearchType.unknown} />
  ));
