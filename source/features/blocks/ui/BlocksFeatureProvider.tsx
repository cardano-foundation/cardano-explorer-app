import React, { useState } from 'react';
import { useFeature } from '../../../lib/react/hooks';
import { blocksContext, createBlocksFeature, IBlocksFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const BlocksFeatureProvider = (props: IProps) => {
  const [blocksFeature] = useState<IBlocksFeature>(createBlocksFeature());
  useFeature(blocksFeature);
  return (
    <blocksContext.Provider value={blocksFeature}>
      {props.children}
    </blocksContext.Provider>
  );
};
