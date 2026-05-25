import { Badge } from '@/components/ui/Badge/Badge';
import { USER_ROLES } from '@/constants/user.constant';

type TRoleCellProps = {
  value?: string;
};

const ROLE_VARIANTS = {
  [USER_ROLES.ADMIN]: 'danger',
  [USER_ROLES.MANAGER]: 'warning',
  [USER_ROLES.USER]: 'neutral',
} as const;

const RoleCell = ({ value }: TRoleCellProps) => {
  const normalizedValue = value?.toLowerCase() ?? '';
  const variant = ROLE_VARIANTS[normalizedValue as keyof typeof ROLE_VARIANTS] ?? 'neutral';

  return <Badge variant={variant}>{value ?? '-'}</Badge>;
};

export { RoleCell };
