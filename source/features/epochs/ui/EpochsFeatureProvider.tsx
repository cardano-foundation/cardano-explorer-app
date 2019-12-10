import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { useBlocksFeature } from '../../blocks/context';
import { useNetworkInfoFeature } from '../../network-info/context';
import { epochsContext } from '../context';
import { createEpochsFeature, IEpochsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const EpochsFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const networkInfo = useNetworkInfoFeature();
  const blocks = useBlocksFeature();
  const [epochsFeature] = useState<IEpochsFeature>(
    createEpochsFeature(blocks, networkInfo, graphqlClient)
  );
  useFeature(epochsFeature);
  return (
    <epochsContext.Provider value={epochsFeature}>
      {props.children}
    </epochsContext.Provider>
  );
};
