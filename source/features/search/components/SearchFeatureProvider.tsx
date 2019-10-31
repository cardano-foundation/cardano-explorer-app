import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { createSearchFeature, ISearchFeature, searchContext } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const SearchFeatureProvider = (props: IProps) => {
  const apolloClient = useApolloClient();
  const [searchFeature] = useState<ISearchFeature>(
    createSearchFeature(apolloClient)
  );
  useFeature(searchFeature);
  return (
    <searchContext.Provider value={searchFeature}>
      {props.children}
    </searchContext.Provider>
  );
};
