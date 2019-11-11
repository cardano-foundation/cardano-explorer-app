export interface ITransactionDetails {
  address: string;
  block: {
    id?: string;
    height?: number | null;
  };
  epoch?: number;
  id: string;
  fee: number;
  receivedTime: number;
  slot?: number | null;
  totalOutput: number;
}
