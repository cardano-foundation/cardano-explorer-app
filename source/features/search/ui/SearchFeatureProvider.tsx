import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import { searchContext } from '../context';
import { createSearchFeature, ISearchFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const SearchFeatureProvider = (props: IProps) => {
  const apollo = useApolloClient();
  const navigation = useNavigationFeature();
  const networkInfo = useNetworkInfoFeature();
  const [searchFeature] = useState<ISearchFeature>(
    createSearchFeature(apollo, navigation, networkInfo)
  );
  useFeature(searchFeature);
  return (
    <searchContext.Provider value={searchFeature}>
      {props.children}
    </searchContext.Provider>
  );
};
