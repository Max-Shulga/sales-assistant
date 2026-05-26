'use client';

import { UserPlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button/Button';

import { CreateUserModal } from '../CreateUserModal/CreateUserModal';
import { UsersGrid } from '../UsersGrid/UsersGrid';
import { UsersTableSkeleton } from '../UsersTableSkeleton/UsersTableSkeleton';

import { useUsersTable } from './hooks/useUsersTable';
import styles from './UsersTableContainer.module.scss';

const UsersTableContainer = () => {
  const { users, isLoading, usersCount } = useUsersTable();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>
            Total users: <span>{usersCount}</span>
          </p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <UserPlus size={16} />
          Add User
        </Button>
      </div>

      <div className={styles.tableSection}>
        <UsersGrid users={users} />
      </div>

      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </section>
  );
};

export { UsersTableContainer };
