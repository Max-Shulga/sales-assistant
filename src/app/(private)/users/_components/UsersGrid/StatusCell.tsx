import { Badge } from '@/components/ui/Badge/Badge';
import { USER_STATUSES } from '@/constants/user.constant';

type TStatusCellProps = {
  value?: string;
};

const STATUS_VARIANTS = {
  [USER_STATUSES.ACTIVE]: 'success',
  [USER_STATUSES.INACTIVE]: 'neutral',
  [USER_STATUSES.PENDING]: 'warning',
} as const;

const StatusCell = ({ value }: TStatusCellProps) => {
  const normalizedValue = value?.toLowerCase() ?? '';
  const variant = STATUS_VARIANTS[normalizedValue as keyof typeof STATUS_VARIANTS] ?? 'warning';

  return <Badge variant={variant}>{value ?? '-'}</Badge>;
};

export { StatusCell };
