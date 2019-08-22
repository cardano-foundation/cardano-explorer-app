declare module 'array-sync' {
  interface IResult {
    changed: Array<any>;
    create: Array<any>;
    remove: Array<any>;
    unchanged: Array<any>;
  }
  const arraySync: (
    source: Array<any>,
    updated: Array<any>,
    options: { key: string; keyOnly: boolean }
  ) => Promise<IResult>;
  export default arraySync;
}
