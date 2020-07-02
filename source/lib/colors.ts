import chroma from 'chroma-js';
import { isNil } from 'lodash';

// Ranking 001: hsla(142, 76%, 45%, 1)
// Ranking 100: hsla(15, 97%, 58%, 1)

interface IRangeOptions {
  colors?: Array<any>;
  domain?: Array<number>;
  darken?: number;
  brighten?: number;
  alpha?: number;
  reverse?: boolean;
}

const defaultRangeOptions = {
  alpha: 1,
  brighten: 0,
  colors: ['#1cca5b', '#fc602c'],
  darken: 0,
  domain: [0, 99],
  reverse: false,
};

export const getColorFromRange = (
  index: number | null,
  options?: IRangeOptions
) => {
  const { colors, domain: originalDomain, darken, brighten, alpha, reverse } = {
    ...defaultRangeOptions,
    ...options,
  };
  const domain = originalDomain.slice();
  if (reverse) {
    domain.reverse();
  }
  const scale = chroma.scale(colors).domain(domain);

  if (isNil(index)) {
    return 'transparent';
  }

  return scale(index).darken(darken).brighten(brighten).alpha(alpha).hex();
};
