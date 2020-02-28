import { Address } from 'cardano-js';
import { AddressGroup } from 'cardano-js/dist/Address/AddressGroup';
import { ChainSettings } from 'cardano-js/dist/ChainSettings';
import React from 'react';
import { BrandType, CardanoEra, CardanoNetwork } from '../../../constants';
import { environment } from '../../../environment';
import { useI18nFeature } from '../../i18n/context';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import Search from './Search';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { translate } = useI18nFeature().store;
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature().store;
  const introspectQuery = (query: string) => {
    const chainSettings =
      environment.CARDANO.NETWORK === CardanoNetwork.MAINNET
        ? ChainSettings.mainnet
        : ChainSettings.testnet;
    // Assuming the AddressGroup.jormungandr is the format for Shelley addresses
    // Will update when final decision is made.
    const addressGroup =
      environment.CARDANO.ERA === CardanoEra.BYRON
        ? AddressGroup.byron
        : AddressGroup.jormungandr;
    if (Address.Util.isAddress(query, chainSettings, addressGroup)) {
      search.actions.addressSearchRequested.trigger({
        address: query,
      });
    } else if (query?.length === 64) {
      search.actions.idSearchRequested.trigger({ id: query });
    } else if (/^\d+$/.test(query)) {
      const searchNumber = parseInt(query, 10);
      if (searchNumber > networkInfo.currentEpoch) {
        if (searchNumber > networkInfo.blockHeight) {
          search.actions.unknownSearchRequested.trigger({ query });
        } else {
          search.actions.blockNumberSearchRequested.trigger({
            number: searchNumber,
          });
        }
      } else {
        // Todo: Ask user if wanting to search for block or epoch
        // Until then, epoch is favoured
        search.actions.epochNumberSearchRequested.trigger({
          number: searchNumber,
        });
      }
    } else {
      search.actions.unknownSearchRequested.trigger({ query });
    }
  };
  return (
    <Search
      brandType={props.brandType}
      onSearch={query => introspectQuery(query)}
      placeholder={translate('search.placeholder') as string}
      title={translate('search.title') as string}
    />
  );
};
