/**
 * Listener type as Function that takes specific params <P>
 */
type Listener<P> = (params: P) => any;

/**
 * Action class with typed params
 */
export default class Action<Params> {
  public static resetAllActions() {
    Action.actions.forEach((action) => action.removeAll());
  }

  /**
   * Array of all defined actions in the system
   * @type {[Action]}
   */
  private static actions: Array<Action<any>> = [];

  private listeners: Array<Listener<Params>> = [];

  constructor() {
    Action.actions.push(this);
  }

  public onAction = (listener: Listener<Params>) => {
    this.listeners.push(listener);
  };

  public trigger = (params: Params) => {
    this.listeners.forEach((listener) => listener(params));
  };

  public remove = (listener: Listener<Params>) => {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  };

  public removeAll = () => {
    this.listeners = [];
  };

  public once = (listener: Listener<Params>) => {
    this.listeners.push((...args) => {
      this.remove(listener);
      listener(...args);
    });
  };
}
