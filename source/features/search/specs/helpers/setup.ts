import { graphqlClient } from '../../../../lib/graphql/graphqlClient';
import { createI18nFeature } from '../../../i18n';
import { SupportedLocale } from '../../../i18n/types';
import { NavigationActions } from '../../../navigation';
import { NavigationStore } from '../../../navigation/store';
import { NavigationRouterMock } from '../../../navigation/testing/NavigationRouterMock';
import { NetworkInfoActions } from '../../../network-info';
import { NetworkInfoApi } from '../../../network-info/api';
import { NetworkInfoStore } from '../../../network-info/store';
import { createSearchFeature } from '../../index';

export const setupSearchFeature = () => {
  const navActions = new NavigationActions();
  return createSearchFeature(
    graphqlClient,
    {
      actions: navActions,
      store: new NavigationStore(
        navActions,
        new NavigationRouterMock(),
        createI18nFeature(SupportedLocale.EN)
      ),
    },
    {
      store: new NetworkInfoStore(
        new NetworkInfoActions(),
        new NetworkInfoApi(graphqlClient)
      ),
    }
  );
};
