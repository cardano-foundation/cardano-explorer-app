import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useStakePools } from '../../context';
import UnmoderatedDataConsented from './UnmoderatedDataConsented';

export const UnmoderatedDataConsentedContainer = () => {
  const { store } = useStakePools();
  return (
    <Observer>
      {() =>
        store.showUnmoderatedData ? <UnmoderatedDataConsented /> : <span />
      }
    </Observer>
  );
};
