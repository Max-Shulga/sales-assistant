const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  USERS: '/users',
  DASHBOARD: '/dashboard',
} as const;

const PROTECTED_ROUTES = [ROUTES.USERS, ROUTES.DASHBOARD] as const;

const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;

export { ROUTES, PROTECTED_ROUTES, AUTH_ROUTES };
