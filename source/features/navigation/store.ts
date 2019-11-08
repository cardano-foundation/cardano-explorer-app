import { action } from 'mobx';
import { NextRouter } from 'next/router';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { NavigationActions } from './index';

export class NavigationStore extends Store {
  private readonly navigationActions: NavigationActions;
  private readonly router: NextRouter;

  constructor(navigationActions: NavigationActions, router: NextRouter) {
    super();
    this.navigationActions = navigationActions;
    this.router = router;

    this.registerActions(
      createActionBindings([
        [this.navigationActions.redirectTo, this.redirectTo],
        [this.navigationActions.goToEpochDetailsPage, this.showEpochByNumber],
        [
          this.navigationActions.goToBlockDetailsByNumber,
          this.goToBlockDetailsByNumber,
        ],
        [
          this.navigationActions.goToBlockDetailsById,
          this.goToBlockDetailsById,
        ],
      ])
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private redirectTo = async (
    props: ActionProps<typeof NavigationActions.prototype.redirectTo>
  ) => {
    return this.router.push(props.path);
  };

  @action private showEpochByNumber = async (
    props: ActionProps<typeof NavigationActions.prototype.goToEpochDetailsPage>
  ) => {
    return this.router.push(`/epoch?number=${props.number}`);
  };

  @action private goToBlockDetailsByNumber = async (
    props: ActionProps<
      typeof NavigationActions.prototype.goToBlockDetailsByNumber
    >
  ) => {
    return this.router.push(`/block?number=${props.number}`);
  };

  @action private goToBlockDetailsById = async (
    props: ActionProps<typeof NavigationActions.prototype.goToBlockDetailsById>
  ) => {
    return this.router.push(`/block?id=${props.id}`);
  };
}
