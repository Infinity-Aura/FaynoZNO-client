import React from 'react';
import { useGate, useStore } from 'effector-react';

import { CreateCourseForm } from 'features/course/create';
import { AdminCourseDeleteMenuItem } from 'features/admin/course/delete';

import { Course } from 'entities/course';

import { Box, Card, Typography } from 'shared/ui/kit';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';

import * as model from '../model';
import { StudentsMenu } from './students-menu';

const renderRowActions = (record: Course) => {
  const items = [
    {
      component: <AdminCourseDeleteMenuItem key="delete" id={record.id} />,
    },
  ].map((el) => el.component);

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const courseColumnHelper = createColumnHelper<Course>();

const courseColumnsDef = [
  courseColumnHelper.accessor((row) => row.title, {
    id: 'title',
    header: 'Title',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.title}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.subtitle, {
    id: 'subtitle',
    header: 'Subtitle',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.subtitle}</Typography>
    ),
  }),
  courseColumnHelper.accessor(() => 'lessonsCount', {
    id: 'lessonsCount',
    header: 'Lessons Count',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.lessonsCount}</Typography>
    ),
  }),
  courseColumnHelper.accessor((row) => row.duration, {
    id: 'duration',
    header: 'Duration',
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.duration}</Typography>
    ),
  }),
  courseColumnHelper.accessor(() => 'students', {
    id: 'students',
    header: 'Students Count',
    cell: ({ row: { original: record } }) => (
      <Box>
        {record.students.length ? (
          <StudentsMenu courseId={record.id} studentsIds={record.students} />
        ) : (
          <>No students</>
        )}
      </Box>
    ),
  }),
  courseColumnHelper.accessor(() => 'teachers', {
    id: 'teachers',
    header: 'Teachers Count',
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.teachers.length}</Typography>
    ),
  }),
  courseColumnHelper.accessor(() => 'cost', {
    id: 'cost',
    header: 'Cost',
    cell: ({ row: { original: record } }) => (
      <Box>
        <Typography variant="h5">Old Price: {record.cost.oldPrice}</Typography>
        <Typography variant="h5">New Price: {record.cost.newPrice}</Typography>
      </Box>
    ),
  }),
  courseColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const AdminCoursesPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const courses = useStore(model.$courses);
  const loading = useStore(model.getCoursesFx.pending);

  return (
    <Card sx={{ p: 2 }}>
      <CreateCourseForm />
      <DataGrid<Course>
        data={courses ?? []}
        columns={courseColumnsDef}
        params={{
          page: params.page,
          pageSize: params.pageSize,
          totalCount: courses?.length ?? 0,
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
