import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { useNetworkInfoFeature } from '../../network-info/context';
import { blocksContext } from '../context';
import { createBlocksFeature, IBlocksFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const BlocksFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const networkInfo = useNetworkInfoFeature();
  const [blocksFeature] = useState<IBlocksFeature>(
    createBlocksFeature(networkInfo, graphqlClient)
  );
  useFeature(blocksFeature);
  return (
    <blocksContext.Provider value={blocksFeature}>
      {props.children}
    </blocksContext.Provider>
  );
};
