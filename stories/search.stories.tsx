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
import SearchSuggestions from '../source/features/search/ui/SearchSuggestions';
import { PaddingDecorator } from './support/PaddingDecorator';

const SearchWithValue = (props: ISearchProps) =>
  React.createElement(() => {
    const { placeholder, brandType, onSearch, title } = props;
    const [searchValue, setSearchValue] = useState('12');
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
  });

storiesOf('Search|Search Bar', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
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
      <SearchSuggestions value={'12'} onSearchTypeSelect={noop} />
    </div>
  ));

storiesOf('Search|No Result', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
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
