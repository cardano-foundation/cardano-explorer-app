import { action } from 'mobx';
import { NextRouter } from 'next/router';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { NavigationActions } from './index';

export class NavigationStore extends Store {
  private readonly searchActions: NavigationActions;
  private readonly router: NextRouter;

  constructor(searchActions: NavigationActions, router: NextRouter) {
    super();
    this.searchActions = searchActions;
    this.router = router;

    this.registerActions(
      createActionBindings([[this.searchActions.redirectTo, this.redirectTo]])
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private redirectTo = async ({ path }: { path: string }) => {
    return this.router.push(path);
  };
}
