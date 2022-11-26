export type SeverityType = 'info' | 'success' | 'error';

export type Log = {
  message: string,
  severity: SeverityType
  dataText?: string,
  head?: string,
  tail?: string,
};

export type NotificationState = {
  isLoading: boolean;
  log: Log[];
};
