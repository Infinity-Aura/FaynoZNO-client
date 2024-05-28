import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Grid } from 'shared/ui/kit';

import { AdminNavBar } from './navbar';

export const AdminLayout = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item md={12}>
          <AdminNavBar />
        </Grid>
        <Grid item md={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};
