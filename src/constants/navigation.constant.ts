import { LayoutDashboard, Users } from 'lucide-react';

import { ROUTES } from './routes.constant';

const SIDEBAR_NAVIGATION = [
  {
    href: ROUTES.USERS,
    label: 'Users',
    icon: Users,
  },
  {
    href: ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
] as const;

export { SIDEBAR_NAVIGATION };
