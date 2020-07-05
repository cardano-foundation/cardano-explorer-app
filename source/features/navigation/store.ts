import { isEmpty } from 'lodash';
import { action, observable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import * as querystring from 'querystring';
import ReactGA from 'react-ga';
import URL from 'url';
import { environment } from '../../environment';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { I18nActions, I18nFeature } from '../i18n';
import { SupportedLocale } from '../i18n/types';
import {
  INavigationQueryParams,
  INavigationRouterDependency,
  NavigationActions,
} from './index';

if (environment.GA_TRACKING_ID) {
  ReactGA.initialize(environment.GA_TRACKING_ID);
}

/**
 * Router abstraction layer and mobx based route state
 */
export class NavigationStore extends Store {
  @observable public path: string = '';
  @observable public url: string = '';
  @observable public query: INavigationQueryParams = {};

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
    await super.start();
  }

  public async stop(): Promise<void> {
    await super.stop();
    this.router.events.off(
      'routeChangeComplete',
      this.updateStateOnRouteChange
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private push = (
    props: ActionProps<typeof NavigationActions.prototype.push>
  ) => {
    this.path = props.path ?? this.path;
    this.query = props.query ?? this.query;
    const { locale } = this.i18n.store;
    this.pushRoute(this.buildUrl(this.path, this.query), locale);
  };

  @action private updateStateOnRouteChange = (url: string) => {
    const parsedUrl = URL.parse(url);
    if (!parsedUrl.pathname) {
      return;
    }
    // Extract locale from the URL to normalize the paths internally
    this.path = parsedUrl.pathname.substring(3);
    if (parsedUrl.query) {
      this.query = querystring.parse(parsedUrl.query);
    } else {
      this.query = {};
    }
    this.url = url;
    if (environment.GA_TRACKING_ID) {
      ReactGA.pageview(url);
    }
  };

  @action private updateRouteOnLocaleChange = (
    props: ActionProps<typeof I18nActions.prototype.switchLocale>
  ) => {
    this.pushRoute(this.buildUrl(this.path, this.query), props.locale, true);
  };

  // ========= PRIVATE HELPERS ==========

  private buildUrl = (path: string, query: INavigationQueryParams) =>
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
