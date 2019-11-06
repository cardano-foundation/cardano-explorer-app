import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { useNetworkInfoFeature } from '../../network-info/context';
import { blocksContext } from '../context';
import { createBlocksFeature, IBlocksFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const BlocksFeatureProvider = (props: IProps) => {
  const apolloClient = useApolloClient();
  const networkInfo = useNetworkInfoFeature();
  const [blocksFeature] = useState<IBlocksFeature>(
    createBlocksFeature(networkInfo, apolloClient)
  );
  useFeature(blocksFeature);
  return (
    <blocksContext.Provider value={blocksFeature}>
      {props.children}
    </blocksContext.Provider>
  );
};
