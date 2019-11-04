import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { useNavigationFeature } from '../../navigation';
import { createSearchFeature, ISearchFeature, searchContext } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const SearchFeatureProvider = (props: IProps) => {
  const apollo = useApolloClient();
  const navigation = useNavigationFeature();
  const [searchFeature] = useState<ISearchFeature>(
    createSearchFeature(navigation.actions, apollo)
  );
  useFeature(searchFeature);
  return (
    <searchContext.Provider value={searchFeature}>
      {props.children}
    </searchContext.Provider>
  );
};
