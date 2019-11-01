import { storiesOf } from '@storybook/react';
import cx from 'classnames';
import { noop } from 'lodash';
import { useState } from 'react';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { BrandType } from '../source/constants';
import NoSearchResult from '../source/features/search/components/NoSearchResult';
import Search, {
  ISearchProps,
} from '../source/features/search/components/Search';
import styles from '../source/features/search/components/Search.scss';
import { PaddingDecorator } from './support/PaddingDecorator';

const SearchWithValue = (props: ISearchProps) =>
  React.createElement(() => {
    const { placeholder, brandType, onSearch, title } = props;
    const [searchValue, setSearchValue] = useState(
      '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634'
    );
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

storiesOf('Search', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Search without value', () => <Search onSearch={noop} />)
  .add('Search with value', () => (
    <SearchWithValue
      title="Search"
      brandType={BrandType.ENLARGED}
      onSearch={noop}
    />
  ))
  .add('No Search Result', () => <NoSearchResult />);
