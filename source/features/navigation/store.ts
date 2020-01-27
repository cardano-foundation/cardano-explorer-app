import { action, observable } from 'mobx';
import Router from 'next/router';
import * as querystring from 'querystring';
import { ParsedUrlQuery } from 'querystring';
import URL from 'url';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { INavigationRouterDependency, NavigationActions } from './index';

/**
 * Router abstraction layer and mobx based route state
 */
export class NavigationStore extends Store {
  @observable public path: string = '';
  @observable public query: ParsedUrlQuery = {};

  private readonly navigationActions: NavigationActions;
  private readonly router: INavigationRouterDependency;

  constructor(
    navigationActions: NavigationActions,
    router: INavigationRouterDependency
  ) {
    super();
    this.navigationActions = navigationActions;
    this.router = router;

    this.registerActions(
      createActionBindings([[this.navigationActions.push, this.push]])
    );
  }

  public async start(): Promise<void> {
    super.start();
    Router.events.on('routeChangeComplete', this.updateStateOnRouteChange);
  }

  public async stop(): Promise<void> {
    super.stop();
    Router.events.off('routeChangeComplete', this.updateStateOnRouteChange);
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private push = async (
    props: ActionProps<typeof NavigationActions.prototype.push>
  ) => {
    this.router.push({
      pathname: props.path,
      query: props.query,
    });
  };

  @action private updateStateOnRouteChange = (url: string) => {
    const parsedUrl = URL.parse(url);
    if (!parsedUrl.pathname) {
      return;
    }
    this.path = parsedUrl.pathname;
    if (parsedUrl.query) {
      this.query = querystring.parse(parsedUrl.query);
    } else {
      this.query = {};
    }
  };
}
