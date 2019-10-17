import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrandType } from '../../../../common/constants';
import Header from '../components/Header';

export const HeaderComponentContainerRaw = () => {
  return <Header withSearch brandType={BrandType.ENLARGED} />;
};

export const HeaderComponentContainer = observer(HeaderComponentContainerRaw);
