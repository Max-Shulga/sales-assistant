'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDEBAR_NAVIGATION } from '@/constants/navigation.constant';

import styles from './SidebarNavigation.module.scss';

const SidebarNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {SIDEBAR_NAVIGATION.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            className={cn(styles.link, {
              [styles.active]: isActive,
            })}
            href={href}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export { SidebarNavigation };
