import React from 'react';
import { useGate, useStore } from 'effector-react';

import { UserOrder } from 'entities/order';

import { Box, Card, Typography } from 'shared/ui/kit';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';

import * as model from '../model';
import { AdminOrderDeleteMenuItem } from 'features/admin/order/delete';
import { StatusAlert } from './status-alert';
import { AdminUpdateStatusOrderMenuItem } from 'features/admin/order/update-status';

const renderRowActions = (record: UserOrder) => {
  const items = [
    {
      component: (
        <AdminUpdateStatusOrderMenuItem key="approve-status" order={record} status="Approved" />
      ),
      show: (record: UserOrder) => record.status === 'Denied' || record.status === 'Pending',
    },
    {
      component: (
        <AdminUpdateStatusOrderMenuItem key="deny-status" order={record} status="Denied" />
      ),
      show: (record: UserOrder) => record.status === 'Approved' || record.status === 'Pending',
    },
    {
      component: <AdminOrderDeleteMenuItem key="delete" id={record.id} />,
      show: () => true,
    },
  ]
    .filter((el) => el.show(record))
    .map((el) => el.component);

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const orderColumnHelper = createColumnHelper<UserOrder>();

const orderColumnsDef = [
  orderColumnHelper.accessor((row) => row.courseName, {
    id: 'courseName',
    header: 'Course title',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.courseName}</Typography>
    ),
  }),
  orderColumnHelper.accessor((row) => row.userId, {
    id: 'userFullName',
    header: 'User full name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">
        {record.userFirstName} {record.userSecondName}
      </Typography>
    ),
  }),
  orderColumnHelper.accessor((row) => row.userEmail, {
    id: 'userEmail',
    header: 'User email',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.userEmail}</Typography>
    ),
  }),
  orderColumnHelper.accessor((row) => row.status, {
    id: 'status',
    header: 'Status',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">
        <StatusAlert status={record.status} />
      </Typography>
    ),
  }),
  orderColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const AdminOrdersPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const orders = useStore(model.$orders);
  const loading = useStore(model.getUsersOrdersFx.pending);

  return (
    <Card sx={{ p: 2 }}>
      <DataGrid<UserOrder>
        data={orders ?? []}
        columns={orderColumnsDef}
        params={{
          page: params.page,
          pageSize: params.pageSize,
          totalCount: orders?.length ?? 0,
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
