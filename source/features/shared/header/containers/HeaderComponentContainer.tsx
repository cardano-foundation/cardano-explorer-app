import { observer } from 'mobx-react-lite';
import React from 'react';
import { ISearchFormProps } from '../../search/components/Search';
import Header from '../components/Header';
import { useBlocks } from '../hooks';

export const HeaderComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  const searchFormProps: ISearchFormProps = {
    searchResult: null,
    triggerBlockSearch: () => {
      return null;
    },
  };
  return <Header searchFormProps={searchFormProps} />;
};

export const HeaderComponentContainer = observer(HeaderComponentContainerRaw);
