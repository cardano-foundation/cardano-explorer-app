import Action from './Action';

export default class ActionBinding<Props> {
  private action: Action<Props>;
  private handler: (p: Props) => void;
  private isActive = false;

  constructor(action: Action<Props>, handler: (p: Props) => void) {
    this.action = action;
    this.handler = handler;
  }

  public start() {
    if (!this.isActive) {
      const { action, handler } = this;
      action.onAction(handler);
      this.isActive = true;
    }
  }

  public stop() {
    if (this.isActive) {
      const { action, handler } = this;
      action.remove(handler);
      this.isActive = false;
    }
  }
}

export type ActionProps<A> = A extends Action<infer P> ? P : never;

export const createActionBindings = (
  actions: Array<[Action<any>, (props: any) => void]>
): ActionBinding<any>[] => actions.map((a) => new ActionBinding(a[0], a[1]));
