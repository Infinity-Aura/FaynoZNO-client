import React from 'react';
import { useGate, useStore } from 'effector-react';

import { AdminGroupDeleteMenuItem } from 'features/admin/group/delete';

import { Group } from 'entities/group';

import { Box, Card, Typography } from 'shared/ui/kit';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';

import * as model from '../model';
import { CreateGroupForm } from 'features/admin/group/create';

const renderRowActions = (record: Group) => {
  const items = [
    {
      component: <AdminGroupDeleteMenuItem key="delete" id={record.id} />,
    },
  ].map((el) => el.component);

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const groupColumnHelper = createColumnHelper<Group>();

const groupColumnsDef = [
  groupColumnHelper.accessor((row) => row.title, {
    id: 'title',
    header: 'Title',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.title}</Typography>,
  }),
  groupColumnHelper.accessor(() => 'number', {
    id: 'number',
    header: 'Number',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.number}</Typography>,
  }),
  groupColumnHelper.accessor(() => 'studentsIds', {
    id: 'studentsIds',
    header: 'Students ids',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.studentsIds}</Typography>
    ),
  }),
  groupColumnHelper.accessor(() => 'coursesIds', {
    id: 'coursesIds',
    header: 'Courses ids',
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.coursesIds}</Typography>
    ),
  }),
  groupColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const AdminGroupsPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const groups = useStore(model.$groups);
  const loading = useStore(model.getGroupsFx.pending);

  return (
    <Card sx={{ p: 2 }}>
      <CreateGroupForm />
      <DataGrid<Group>
        data={groups ?? []}
        columns={groupColumnsDef}
        params={{
          page: params.page,
          pageSize: params.pageSize,
          totalCount: groups?.length ?? 0,
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
