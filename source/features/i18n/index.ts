import Action from '../../lib/Action';
import { EnumToArray } from '../../lib/enums';
import { debugActions } from '../../lib/logging';
import { I18nStore } from './store';
import { SupportedLocale } from './types';

export const SUPPORTED_LOCALES = EnumToArray(SupportedLocale);
export const DEFAULT_LOCALE = SupportedLocale.EN;

/**
 * Defines the actions that are supported by this feature
 */
@debugActions('CE.i18n.actions')
export class I18nActions {
  public switchLocale: Action<{ locale: SupportedLocale }> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface I18nFeature {
  actions: I18nActions;
  store: I18nStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createI18nFeature = (locale?: SupportedLocale): I18nFeature => {
  const i18nActions = new I18nActions();
  const i18nStore = new I18nStore(i18nActions, locale);
  return {
    actions: i18nActions,
    store: i18nStore,
    start() {
      i18nStore.start();
    },
    stop() {
      i18nStore.stop();
    },
  };
};
