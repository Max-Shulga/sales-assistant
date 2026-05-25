import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes.constant';

export default function Home() {
  redirect(`${ROUTES.LOGIN}`);
}
