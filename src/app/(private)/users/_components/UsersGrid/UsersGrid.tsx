'use client';

import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/routes.constant';
import { useTheme } from '@/contexts/ThemeContext';
import type { TUser } from '@/types/user.type';

import { RoleCell } from './RoleCell';
import { StatusCell } from './StatusCell';
import styles from './UsersGrid.module.scss';

type TUsersGridProps = {
  users: TUser[];
};

const LIGHT_THEME_PARAMS = {
  accentColor: '#2563eb',
  backgroundColor: '#ffffff',
  foregroundColor: '#0f172a',
  borderColor: '#e2e8f0',
  headerBackgroundColor: 'rgba(37, 99, 235, 0.08)',
  rowHoverColor: 'rgba(37, 99, 235, 0.06)',
  fontFamily: 'inherit',
  fontSize: 14,
} as const;

const DARK_THEME_PARAMS = {
  accentColor: '#3b82f6',
  backgroundColor: '#1e293b',
  foregroundColor: '#f1f5f9',
  borderColor: '#334155',
  headerBackgroundColor: 'rgba(59, 130, 246, 0.12)',
  rowHoverColor: 'rgba(59, 130, 246, 0.1)',
  fontFamily: 'inherit',
  fontSize: 14,
} as const;

const UsersGrid = ({ users }: TUsersGridProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const gridTheme = useMemo(
    () => (theme === 'dark' ? themeQuartz.withParams(DARK_THEME_PARAMS) : themeQuartz.withParams(LIGHT_THEME_PARAMS)),
    [theme]
  );

  const columnDefs = useMemo<ColDef<TUser>[]>(
    () => [
      {
        field: 'full_name',
        headerName: 'Full Name',
        tooltipField: 'full_name',
        flex: 1.2,
        minWidth: 160,
      },
      {
        field: 'email',
        headerName: 'Email',
        tooltipField: 'email',
        flex: 1.4,
        minWidth: 220,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        tooltipField: 'phone',
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'role',
        headerName: 'Role',
        tooltipField: 'role',
        cellRenderer: RoleCell,
        flex: 0.9,
        minWidth: 120,
      },
      {
        field: 'status',
        headerName: 'Status',
        tooltipField: 'status',
        cellRenderer: StatusCell,
        flex: 0.9,
        minWidth: 120,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        valueFormatter: ({ value }) => (value ? new Date(value).toLocaleDateString() : ''),
        tooltipValueGetter: ({ value }) => (value ? new Date(value).toLocaleString() : ''),
        flex: 1,
        minWidth: 140,
      },
    ],
    []
  );

  const handleRowClick = (event: RowClickedEvent<TUser>) => {
    if (!event.data) return;
    router.push(`${ROUTES.USERS}/${event.data.id}`);
  };

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className={styles.gridWrapper}>
        <AgGridReact<TUser>
          theme={gridTheme}
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          headerHeight={36}
          rowHeight={36}
          tooltipShowDelay={200}
          animateRows
          suppressCellFocus
          onRowClicked={handleRowClick}
        />
      </div>
    </AgGridProvider>
  );
};

export { UsersGrid };
