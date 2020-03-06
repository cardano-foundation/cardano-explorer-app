import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Search.module.scss';
const ArrowRight = require('../../../public/assets/images/arrow-right.svg');

export interface ISearchSuggestionsProps {
  value?: string;
  onSearchTypeSelect: (value: string) => any;
}

const SearchSuggestions = (props: ISearchSuggestionsProps) => {
  const { value, onSearchTypeSelect } = props;

  return (
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
  );
};

SearchSuggestions.defaultProps = {
  value: '',
};

export default observer(SearchSuggestions);
