import { action, observable } from 'mobx';
import { NextRouter } from 'next/router';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { NavigationActions } from './index';

export class NavigationStore extends Store {
  private readonly navigationActions: NavigationActions;
  private readonly router: NextRouter;
  @observable public currentRoute: string;

  constructor(navigationActions: NavigationActions, router: NextRouter) {
    super();
    this.navigationActions = navigationActions;
    this.router = router;

    this.registerActions(
      createActionBindings([
        [this.navigationActions.redirectTo, this.redirectTo],
        [this.navigationActions.goToAddressDetailsPage, this.showAddress],
        [this.navigationActions.goToBlockDetailsPage, this.showBlockById],
        [this.navigationActions.goToEpochDetailsPage, this.showEpochByNumber],
        [
          this.navigationActions.goToTransactionDetailsPage,
          this.showTransactionById,
        ],
      ])
    );
    this.registerReactions(createReactions([this.pushRouteChange]));
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private redirectTo = async (
    props: ActionProps<typeof NavigationActions.prototype.redirectTo>
  ) => {
    return (this.currentRoute = props.path);
  };

  @action private showAddress = async (
    props: ActionProps<
      typeof NavigationActions.prototype.goToAddressDetailsPage
    >
  ) => {
    return (this.currentRoute = `/address?address=${props.address}`);
  };

  @action private showBlockById = async (
    props: ActionProps<typeof NavigationActions.prototype.goToBlockDetailsPage>
  ) => {
    return (this.currentRoute = `/block?id=${props.id}`);
  };

  @action private showEpochByNumber = async (
    props: ActionProps<typeof NavigationActions.prototype.goToEpochDetailsPage>
  ) => {
    return (this.currentRoute = `/epoch?number=${props.number}`);
  };

  @action private showTransactionById = async (
    props: ActionProps<
      typeof NavigationActions.prototype.goToTransactionDetailsPage
    >
  ) => {
    return (this.currentRoute = `/transaction?id=${props.id}`);
  };

  // ============ REACTIONS =============

  private pushRouteChange = () => {
    if (!this.currentRoute) {
      return;
    }
    return this.router.push(this.currentRoute);
  };
}
