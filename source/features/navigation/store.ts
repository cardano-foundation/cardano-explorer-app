import { isEqual } from 'lodash';
import { action, observable } from 'mobx';
import * as querystring from 'querystring';
import { ParsedUrlQuery } from 'querystring';
import URL from 'url';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { I18nFeature } from '../i18n';
import { INavigationRouterDependency, NavigationActions } from './index';

/**
 * Router abstraction layer and mobx based route state
 */
export class NavigationStore extends Store {
  @observable public path: string = '';
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
      createActionBindings([[this.navigationActions.push, this.push]])
    );
  }

  public async start(): Promise<void> {
    super.start();
    this.updateStateOnRouteChange(this.router.asPath);
    this.router.events.on('routeChangeComplete', this.updateStateOnRouteChange);
  }

  public async stop(): Promise<void> {
    super.stop();
    this.router.events.off(
      'routeChangeComplete',
      this.updateStateOnRouteChange
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private push = async (
    props: ActionProps<typeof NavigationActions.prototype.push>
  ) => {
    const query = querystring.stringify(props.query);
    const url = `${props.path}?${query}`;
    // Use Next.js shallow routing in combination with dynamic routes
    // https://nextjs.org/docs/routing/shallow-routing
    this.router.push(`/[locale]${url}`, `/${this.i18n.store.locale}${url}`, {
      shallow: true,
    });
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
  };
}
