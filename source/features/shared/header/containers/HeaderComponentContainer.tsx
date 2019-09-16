import { observer } from 'mobx-react-lite';
import React from 'react';
import Header from '../components/Header';

export const HeaderComponentContainerRaw = () => {
  return <Header title={''} />;
};

export const HeaderComponentContainer = observer(HeaderComponentContainerRaw);
