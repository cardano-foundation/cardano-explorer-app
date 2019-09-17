import { observer } from 'mobx-react-lite';
import React from 'react';
import Header, { BrandType } from '../components/Header';

export const HeaderComponentContainerRaw = () => {
  return <Header withBackground withSearch brandType={BrandType.ENLARGED} />;
};

export const HeaderComponentContainer = observer(HeaderComponentContainerRaw);
