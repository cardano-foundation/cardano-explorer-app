import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { networkInfoContext } from '../context';
import { createNetworkInfoFeature, INetworkInfoFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const NetworkInfoFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const [networkInfoFeature] = useState<INetworkInfoFeature>(
    createNetworkInfoFeature(graphqlClient)
  );
  useFeature(networkInfoFeature);
  return (
    <networkInfoContext.Provider value={networkInfoFeature}>
      {props.children}
    </networkInfoContext.Provider>
  );
};
