import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { networkInfoContext } from '../context';
import { createNetworkInfoFeature, INetworkInfoFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const NetworkInfoFeatureProvider = (props: IProps) => {
  const apollo = useApolloClient();
  const [networkInfoFeature] = useState<INetworkInfoFeature>(
    createNetworkInfoFeature(apollo)
  );
  useFeature(networkInfoFeature);
  return (
    <networkInfoContext.Provider value={networkInfoFeature}>
      {props.children}
    </networkInfoContext.Provider>
  );
};
