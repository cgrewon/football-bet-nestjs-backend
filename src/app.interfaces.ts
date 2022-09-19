export enum Status {
  failed = 'failed',
  success = 'success',
}

export interface ResultWords {
  status: Status;
  message: string | undefined;
  result: string;
}
