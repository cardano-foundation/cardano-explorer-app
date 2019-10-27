import Action from './Action';

export default class ActionBinding {
  private binding: [Action<any>, any];
  private isActive = false;

  constructor(binding: [Action<any>, any]) {
    this.binding = binding;
  }

  public start() {
    if (!this.isActive) {
      const { binding } = this;
      binding[0].onAction(binding[1]);
      this.isActive = true;
    }
  }

  public stop() {
    if (this.isActive) {
      const { binding } = this;
      binding[0].remove(binding[1]);
      this.isActive = false;
    }
  }
}

export const createActionBindings = (actions: Array<[Action<any>, any]>) =>
  actions.map(a => new ActionBinding(a));
