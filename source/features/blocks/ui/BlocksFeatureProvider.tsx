import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { blocksContext, createBlocksFeature, IBlocksFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const BlocksFeatureProvider = (props: IProps) => {
  const apolloClient = useApolloClient();
  const [blocksFeature] = useState<IBlocksFeature>(
    createBlocksFeature(apolloClient)
  );
  useFeature(blocksFeature);
  return (
    <blocksContext.Provider value={blocksFeature}>
      {props.children}
    </blocksContext.Provider>
  );
};
