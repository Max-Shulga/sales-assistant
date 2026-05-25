'use client';

import { useEffect, useState } from 'react';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { TUser } from '@/types/user.type';

const useUsersTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*').order('created_at', {
        ascending: false,
      });

      if (error) {
        console.error('Failed to fetch users:', error.message);
        setIsLoading(false);
        return;
      }

      setUsers(data ?? []);
      setIsLoading(false);
    };

    fetchUsers();

    const channel = supabase
      .channel('users-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
        },
        (payload) => {
          setUsers((currentUsers) => {
            if (payload.eventType === 'INSERT') {
              const newUser = payload.new as TUser;
              return [newUser, ...currentUsers];
            }

            if (payload.eventType === 'UPDATE') {
              const updatedUser = payload.new as TUser;

              return currentUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user));
            }

            if (payload.eventType === 'DELETE') {
              const deletedUser = payload.old as TUser;

              return currentUsers.filter((user) => user.id !== deletedUser.id);
            }

            return currentUsers;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    users,
    isLoading,
    usersCount: users.length,
  };
};

export { useUsersTable };
