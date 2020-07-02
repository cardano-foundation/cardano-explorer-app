import pull from 'lodash/pull';

import ActionBinding from './ActionBinding';
import Reaction from './mobx/Reaction';

export class Store {
  public isRunning: boolean = false;
  private actionBindings: ActionBinding<any>[] = [];
  private reactions: Reaction[] = [];

  public async start() {
    this.startActions();
    this.startReactions();
    this.isRunning = true;
  }

  public async stop() {
    this.stopActions();
    this.stopReactions();
    this.isRunning = false;
  }

  // ACTIONS

  protected registerActions(actions: ActionBinding<any>[]) {
    this.actionBindings.push(...actions);
  }

  protected unregisterActions(actions: ActionBinding<any>[]) {
    pull(this.actionBindings, ...actions);
  }

  protected startActions(actions = this.actionBindings) {
    actions.forEach((a) => a.start());
  }

  protected stopActions(actions = this.actionBindings) {
    actions.forEach((a) => a.stop());
  }

  // REACTIONS

  protected registerReactions(reactions: Reaction[]) {
    this.reactions.push(...reactions);
  }

  protected unregisterReactions(reactions: Reaction[]) {
    pull(this.reactions, ...reactions);
  }

  protected startReactions(reactions = this.reactions) {
    reactions.forEach((r) => r.start());
  }

  protected stopReactions(reactions = this.reactions) {
    reactions.forEach((r) => r.stop());
  }
}
