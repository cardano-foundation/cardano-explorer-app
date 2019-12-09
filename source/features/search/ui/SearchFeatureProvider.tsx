import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import { searchContext } from '../context';
import { createSearchFeature, ISearchFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const SearchFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const navigation = useNavigationFeature();
  const networkInfo = useNetworkInfoFeature();
  const [searchFeature] = useState<ISearchFeature>(
    createSearchFeature(graphqlClient, navigation, networkInfo)
  );
  useFeature(searchFeature);
  return (
    <searchContext.Provider value={searchFeature}>
      {props.children}
    </searchContext.Provider>
  );
};
