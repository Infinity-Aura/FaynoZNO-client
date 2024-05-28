import React from 'react';
import { useGate, useStore } from 'effector-react';

import { AdminDeleteUserMenuItem } from 'features/admin/user/delete';

import { User } from 'entities/user';

import { Box, Card, Typography } from 'shared/ui/kit';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';

import * as model from '../model';

const renderRowActions = (record: User) => {
  const items = [
    {
      component: <AdminDeleteUserMenuItem key="delete" id={record.id} />,
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
  userColumnHelper.accessor((row) => row.role, {
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

export const AdminTeachersPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const teachers = useStore(model.$teachers);
  const loading = useStore(model.getUsersFx.pending);

  return (
    <Card sx={{ p: 2 }}>
      <DataGrid<User>
        data={teachers ?? []}
        columns={userColumnsDef}
        params={{
          page: params.page,
          pageSize: params.pageSize,
          totalCount: teachers?.length ?? 0,
          rowsPerPage: [2, 4, 50],
        }}
        paramsChanged={({ page, pageSize }) =>
          setParams({ page: page ?? params.page, pageSize: pageSize ?? params.pageSize })
        }
        loading={loading}
      />
    </Card>
  );
};
