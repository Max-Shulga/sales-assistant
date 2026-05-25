'use client';

import { Menu } from '@base-ui/react/menu';
import { LogOut, Settings, UserRound } from 'lucide-react';

import { signOut } from '@/actions/auth';
import type { TSidebarUser } from '@/types/user.type';
import type { TNullable } from '@/types/utility.type';

import styles from './UserMenu.module.scss';

type TUserMenuProps = {
  user: TNullable<TSidebarUser>;
};

const UserMenu = ({ user }: TUserMenuProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger className={styles.trigger}>
        <div className={styles.triggerContent}>
          <div className={styles.avatar}>
            <UserRound size={18} />
          </div>

          <div className={styles.userInfo}>
            <span className={styles.userLabel}>Signed in as</span>
            <span className={styles.userEmail}>{user?.email ?? 'Unknown user'}</span>
          </div>
        </div>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className={styles.popup}>
            <Menu.Item className={styles.item}>
              <Settings size={16} />
              <span>Settings</span>
            </Menu.Item>

            <form action={signOut}>
              <button className={styles.logoutButton} type="submit">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </form>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};

export { UserMenu };
