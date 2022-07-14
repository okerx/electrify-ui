import { CommonColorVariants } from '@/theme/types';

export const StatusVariants: Record<
  string,
  { text: string; color: CommonColorVariants }
> = {
  CONNECTED: { text: 'Connected', color: 'success' },
  NOT_CONNECTED: { text: 'Not Connected', color: 'warning' },
  REMOVED: { text: 'Removed', color: 'error' },
};
