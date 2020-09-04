import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { useNetworkInfoFeature } from '../../network-info/context';
import { stakePoolsContext } from '../context';
import { createStakePoolsFeature, IStakePoolsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const StakePoolsFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const networkInfo = useNetworkInfoFeature();
  const [stakePoolsFeature] = useState<IStakePoolsFeature>(
    createStakePoolsFeature(networkInfo, graphqlClient)
  );
  useFeature(stakePoolsFeature);
  return (
    <stakePoolsContext.Provider value={stakePoolsFeature}>
      {props.children}
    </stakePoolsContext.Provider>
  );
};
