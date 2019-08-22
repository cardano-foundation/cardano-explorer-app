export function compareProp<Item, Prop>(pickFrom: (i: Item) => Prop) {
  return (a: Item, b: Item) => {
    const valA = pickFrom(a);
    const valB = pickFrom(b);
    return valA === valB ? 0 : valA < valB ? 1 : -1;
  };
}
