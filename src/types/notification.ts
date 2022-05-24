export type SeverityType = 'info' | 'success' | 'error';

export type Log = { message: string, severity: SeverityType };

export type NotificationState = {
  isLoading: boolean;
  log: Log[];
};
