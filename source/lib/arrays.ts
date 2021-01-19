import BigNumber from 'bignumber.js';

export function compareProp<Item, Prop>(pickFrom: (i: Item) => Prop) {
  return (a: Item, b: Item) => {
    const valA = pickFrom(a);
    const valB = pickFrom(b);
    return valA === valB ? 0 : valA < valB ? 1 : -1;
  };
}

export const sortTokensDesc = (t1: any, t2: any) => {
  // the bignumber library is necessary because the quantity field could be an unsigned int of 64 bytes
  const quantity1 = new BigNumber(t1.quantity);
  const quantity2 = new BigNumber(t2.quantity);
  const isLower = quantity2.lt(quantity1);
  const isGreater = quantity2.gt(quantity1);

  return isLower ? -1 : isGreater ? 1 : 0;
};
