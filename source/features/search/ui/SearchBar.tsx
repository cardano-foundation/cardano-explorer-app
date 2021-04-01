import cx from 'classnames';
import React from 'react';
import { useState } from 'react';
import { BrandType, SearchType } from '../../../constants';
import { useI18nFeature } from '../../i18n/context';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import Search from './Search';
import styles from './Search.module.scss';
import SearchSuggestions from './SearchSuggestions';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { translate } = useI18nFeature().store;
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature().store;
  const introspectQuery = (query: string, type?: string) => {
    const typeOfSearch = type ? type : searchType;
    if (query.substring(0, 4) === 'addr' || query.substring(0, 5) === 'stake') {
      search.actions.addressSearchRequested.trigger({
        address: query,
      });
    } else if (query?.length === 64) {
      search.actions.idSearchRequested.trigger({ id: query });
    } else if (/^\d+$/.test(query)) {
      const searchNumber = parseInt(query, 10);
      if (
        searchNumber > networkInfo.currentEpoch &&
        searchNumber > networkInfo.blockHeight &&
        searchNumber > networkInfo.slotNo
      ) {
        search.actions.unknownSearchRequested.trigger({ query });
      } else {
        if (typeOfSearch === SearchType.EPOCH) {
          search.actions.epochNumberSearchRequested.trigger({
            number: searchNumber,
          });
        } else if (typeOfSearch === SearchType.BLOCK_BY_NUMBER) {
          search.actions.blockNumberSearchRequested.trigger({
            number: searchNumber,
          });
        } else if (typeOfSearch === SearchType.BLOCK_BY_SLOT_NUMBER) {
          search.actions.slotNumberSearchRequested.trigger({
            slotNo: searchNumber,
          });
        }
      }
    } else {
      // Byron-era addresses have no prefix or standard length
      search.actions.addressSearchRequested.trigger({
        address: query,
      });
    }
  };

  const searchTypeSelectQuery = (value: string) => {
    setSearchType(value);
    introspectQuery(searchValue, value);
    setSearchValue('');
  };

  const removeSearchType = () => {
    setSearchType('');
    setSearchValue('');
  };

  const isSearchValueValid =
    searchValue &&
    searchValue.length < 10 &&
    /^\d+$/.test(searchValue) &&
    !searchType;

  const brandTypeStyle =
    props.brandType === BrandType.SHRINKED
      ? styles.shrinkedSearchSuggestionWrapper
      : '';
  const searchContainerStyles = cx([
    styles.searchSuggestionsWrapper,
    brandTypeStyle,
  ]);

  return (
    <>
      <Search
        brandType={props.brandType}
        onInputChange={(query) => setSearchValue(query.trim())}
        onSearch={(query) => introspectQuery(query.trim())}
        onRemoveSearchType={removeSearchType}
        placeholder={translate('search.placeholder') as string}
        title={translate('search.title') as string}
      />
      {isSearchValueValid && (
        <div className={searchContainerStyles}>
          <SearchSuggestions
            value={searchValue}
            onSearchTypeSelect={(value) => searchTypeSelectQuery(value)}
          />
        </div>
      )}
    </>
  );
};
