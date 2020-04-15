import { isEmpty } from 'lodash';
import { action, observable, runInAction } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import * as querystring from 'querystring';
import URL from 'url';
import { environment } from '../../environment';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { I18nActions, I18nFeature } from '../i18n';
import { SupportedLocale } from '../i18n/types';
import {
  INavigationPushQuery,
  INavigationRouterDependency,
  NavigationActions,
} from './index';

interface IMyWindow extends Window {
  gtag(
    param: string,
    value: string | undefined,
    config: {
      hitType: string;
      page_location: string;
      title: string;
    }
  ): void;
}

declare var window: IMyWindow;

/**
 * Router abstraction layer and mobx based route state
 */
export class NavigationStore extends Store {
  @observable public path: string = '';
  @observable public url: string = '';
  @observable public query: ParsedUrlQuery = {};

  private readonly navigationActions: NavigationActions;
  private readonly router: INavigationRouterDependency;
  private readonly i18n: I18nFeature;

  constructor(
    navigationActions: NavigationActions,
    router: INavigationRouterDependency,
    i18n: I18nFeature
  ) {
    super();

    Object.assign(this, {
      i18n,
      navigationActions,
      router,
    });

    this.registerActions(
      createActionBindings([
        [this.navigationActions.push, this.push],
        [this.i18n.actions.switchLocale, this.updateRouteOnLocaleChange],
      ])
    );
  }

  public async start(): Promise<void> {
    this.updateStateOnRouteChange(this.router.asPath);
    this.router.events.on('routeChangeComplete', this.updateStateOnRouteChange);
    super.start();
  }

  public async stop(): Promise<void> {
    super.stop();
    this.router.events.off(
      'routeChangeComplete',
      this.updateStateOnRouteChange
    );
  }

  private updateGAEvents() {
    if (window && window.gtag) {
      window.gtag('config', environment.GA_TRACKING_ID, {
        hitType: 'pageview',
        page_location: location.pathname,
        title: document.title,
      });
    }
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private push = (
    props: ActionProps<typeof NavigationActions.prototype.push>
  ) => {
    const path = props.path ?? this.path;
    const query = props.query ?? this.query;
    const { locale } = this.i18n.store;
    this.pushRoute(this.buildUrl(path, query), locale);
  };

  @action private updateStateOnRouteChange = (url: string) => {
    const parsedUrl = URL.parse(url);
    if (!parsedUrl.pathname) {
      return;
    }
    if (environment.GA_TRACKING_ID) {
      this.updateGAEvents();
    }
    // Extract locale from the URL to normalize the paths internally
    this.path = parsedUrl.pathname.substring(3);
    if (parsedUrl.query) {
      this.query = querystring.parse(parsedUrl.query);
    } else {
      this.query = {};
    }
    this.url = url;
  };

  @action private updateRouteOnLocaleChange = (
    props: ActionProps<typeof I18nActions.prototype.switchLocale>
  ) => {
    this.pushRoute(this.buildUrl(this.path, this.query), props.locale, true);
  };

  // ========= PRIVATE HELPERS ==========

  private buildUrl = (path: string, query: INavigationPushQuery) =>
    isEmpty(query) ? path : `${path}?${querystring.stringify(query)}`;

  private pushRoute = (
    url: string,
    locale: SupportedLocale,
    isForcedLoad = false
  ) => {
    const localizedUrl = `/${locale}${url}`;
    if (this.url !== localizedUrl) {
      if (isForcedLoad) {
        window.location.href = localizedUrl;
      } else {
        this.router.push(`/[locale]${url}`, localizedUrl);
      }
    }
  };
}
