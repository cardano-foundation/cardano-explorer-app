import { autorun } from 'mobx';
import { useAsObservableSource } from 'mobx-react-lite';
import * as React from 'react';

/**
 * Sets up a react effect as an autorun (tracks mobx observables).
 * Normal props can also be passed as second argument which are then turned
 * into an observable source so that the effect re-runs on prop changes.
 *
 * Inspired by official recipe: https://mobx-react.js.org/recipes-effects
 *
 * @param effect
 * @param observed
 */
export function useObservableEffect<TProps>(
  effect: (observed: TProps) => void,
  observed: TProps = {} as any
) {
  const observableProps = useAsObservableSource(observed);
  React.useEffect(
    () => autorun(() => effect(observableProps)),
    [] // note empty dependencies
  );
}
