import createDebugger from 'debug';
import { environment } from '../environment';
import Action from './Action';

/**
 * Typescript class decorator that can be used to automatically
 * debug any action defined in a feature when the DEBUG flag is set.
 *
 * @param {string} namespace The debug namespace used for the action bundle
 * each action is logged with its name and given props.
 */
export function debugActions(namespace: string) {
  return function logDecorator<
    T extends new (...constructorArgs: any[]) => any
  >(constructor: T) {
    if (!environment.DEBUG) {
      return constructor;
    }
    return class extends constructor {
      constructor(...rest: any[]) {
        super();
        const debug = createDebugger(namespace);
        Reflect.ownKeys(this).forEach((key) => {
          const action = this[key as string] as Action<any>;
          action.onAction((props: any) => {
            debug(key, props);
          });
        });
      }
    };
  };
}
