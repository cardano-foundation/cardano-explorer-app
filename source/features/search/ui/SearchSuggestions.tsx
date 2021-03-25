import { observer } from 'mobx-react-lite';
import React from 'react';
import { useI18nFeature } from '../../i18n/context';
import styles from './Search.module.scss';
const ArrowRight = require('../../../public/assets/images/arrow-right.svg');

export interface ISearchSuggestionsProps {
  value?: string;
  onSearchTypeSelect: (value: string) => any;
}

const SearchSuggestions = (props: ISearchSuggestionsProps) => {
  const { translate } = useI18nFeature().store;
  const { value, onSearchTypeSelect } = props;

  return (
    <div className={styles.searchSuggestionsContainer}>
      <ul className={styles.searchSuggestionsContent}>
        <li onClick={() => onSearchTypeSelect('epoch')}>
          <div>
            {translate('search.suggestion_epoch')} <span>{value}</span>
          </div>
          <ArrowRight />
        </li>
        <li onClick={() => onSearchTypeSelect('blockByNumber')}>
          <div>
            {translate('search.suggestion_block_by_number')} <span>{value}</span>
          </div>
          <ArrowRight />
        </li>
        <li onClick={() => onSearchTypeSelect('blockBySlotNumber')}>
          <div>
            {translate('search.suggestion_block_by_slot')} <span>{value}</span>
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
