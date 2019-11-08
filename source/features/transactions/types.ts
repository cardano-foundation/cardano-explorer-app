export interface ITransactionDetails {
  address: string;
  block: number;
  epoch: number;
  id: string;
  fee: number;
  receivedTime: number;
  slot: number | null;
  totalOutput: number;
}
