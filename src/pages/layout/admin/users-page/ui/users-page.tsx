import React from 'react';
import { useGate, useStore } from 'effector-react';

import { AdminDeleteUserMenuItem } from 'features/admin/user/delete';

import { User } from 'entities/user';

import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from 'shared/ui/kit';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';

import * as model from '../model';
import { Role } from 'entities/user';
import { AdminEditUserRoleDialog, AdminEditUserRoleMenuItem } from 'features/admin/user/edit-role';

const renderRowActions = (record: User) => {
  const items = [
    {
      component: <AdminDeleteUserMenuItem key="delete" id={record.id} />,
    },
    {
      component: <AdminEditUserRoleMenuItem key="edit-role-menu-item" id={record.id} />,
    },
  ].map((el) => el.component);

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const userColumnHelper = createColumnHelper<User>();

const userColumnsDef = [
  userColumnHelper.accessor((row) => row.firstName, {
    id: 'firstName',
    header: 'First name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.firstName}</Typography>
    ),
  }),
  userColumnHelper.accessor((row) => row.secondName, {
    id: 'secondName',
    header: 'Second name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.secondName}</Typography>
    ),
  }),
  userColumnHelper.accessor((row) => row.birth, {
    id: 'birth',
    header: 'Birth',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.birth}</Typography>,
  }),
  userColumnHelper.accessor((row) => row.gender, {
    id: 'gender',
    header: 'Gender',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.gender}</Typography>,
  }),
  userColumnHelper.accessor((row) => row.phoneNumber, {
    id: 'phoneNumber',
    header: 'Phone number',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.phoneNumber}</Typography>
    ),
  }),
  userColumnHelper.accessor((row) => row.email, {
    id: 'email',
    header: 'Email',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.email}</Typography>,
  }),
  userColumnHelper.accessor(() => 'role', {
    id: 'role',
    header: 'Role',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.role}</Typography>,
  }),
  userColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const AdminUsersPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });
  useGate(model.Gate);

  const users = useStore(model.$users);
  const selectedRolesFilter = useStore(model.$selectedRolesFilter);
  const loading = useStore(model.getUsersFx.pending);

  return (
    <Card sx={{ p: 2 }}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Roles filter</InputLabel>
          <Select
            label="Roles"
            value={selectedRolesFilter}
            onChange={({ target: { value } }) => model.rolesFilterChanged(value as Role | 'all')}
          >
            <MenuItem value="all">All</MenuItem>
            {Object.entries(Role).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DataGrid<User>
        data={users ?? []}
        columns={userColumnsDef}
        params={{
          page: params.page,
          pageSize: params.pageSize,
          totalCount: users?.length ?? 0,
          rowsPerPage: [2, 4, 50],
        }}
        paramsChanged={({ page, pageSize }) =>
          setParams({ page: page ?? params.page, pageSize: pageSize ?? params.pageSize })
        }
        loading={loading}
      />
      <AdminEditUserRoleDialog />
    </Card>
  );
};
