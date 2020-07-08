import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import i18next, { TFunctionKeys } from 'i18next';
import { action, observable } from 'mobx';
import { initReactI18next } from 'react-i18next';
import { environment } from '../../environment';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { DEFAULT_LOCALE, I18nActions, SUPPORTED_LOCALES } from './index';
import { SupportedLocale } from './types';
import { isSupportedLocale } from './utils';

interface I18nNextResources {
  [key: string]: object;
}

export class I18nStore extends Store {
  @observable public locale: SupportedLocale;

  private readonly actions: I18nActions;

  constructor(actions: I18nActions, requestedLocale?: string) {
    super();

    let locale = requestedLocale;
    const isLocaleSet = !!locale;
    const isCorrectLocale = isLocaleSet && isSupportedLocale(locale);

    if (!isLocaleSet || (isLocaleSet && !isCorrectLocale)) {
      if (environment.IS_CLIENT) {
        // Set the language based on browser locale or user setting
        locale = this.getInitialLocale();
      } else {
        // Fallback to English on server (for dev mode)
        locale = DEFAULT_LOCALE;
      }
    }

    Object.assign(this, {
      actions,
      locale,
    });

    this.registerActions(
      createActionBindings([[this.actions.switchLocale, this.switchLocale]])
    );
  }

  public async start() {
    super.start();

    const resources: I18nNextResources = {};

    // Load all translations for the 404 page since there won't
    // be a pre-translated static page for this feature!
    SUPPORTED_LOCALES.forEach((l) => {
      resources[l] = {
        '404': require(`./translations/404/${l}`),
      };
    });
    await i18next.use(initReactI18next).init({
      // debug: true,
      initImmediate: false,
      interpolation: {
        // not needed for react as it escapes by default
        escapeValue: false,
      },
      lng: this.locale,
      ns: ['404', 'translation'],
      resources: {
        // Only pre-load the translations for the language we are building for
        // (the pages are static, so we don't need to include all languages on all pages)
        [this.locale]: Object.assign(resources[this.locale], {
          translation: require(`./translations/${this.locale}.json`),
        }),
      },
    });

    dayjs.locale(this.locale);
  }

  // ========== PUBLIC API ============

  /**
   * Translation function, directly forwards to i18next
   * @param key
   */
  public translate(key: TFunctionKeys | TFunctionKeys[]) {
    return i18next.t(key);
  }

  // ========== ACTION HANDLERS ============

  @action public switchLocale = async (
    params: ActionProps<typeof I18nActions.prototype.switchLocale>
  ): Promise<void> => {
    if (isSupportedLocale(params.locale)) {
      this.locale = params.locale;
      // Save user preference!
      localStorage.setItem('locale', params.locale);
    }
  };

  // ========== HELPERS ============

  private getInitialLocale() {
    // Explicit user preference from locale storage
    const localSetting = localStorage.getItem('locale');
    if (localSetting && isSupportedLocale(localSetting)) {
      return localSetting;
    }
    // Language setting of the browser
    const [browserSetting] = navigator.language.split('-');
    if (isSupportedLocale(browserSetting)) {
      return browserSetting;
    }
    return DEFAULT_LOCALE;
  }
}
