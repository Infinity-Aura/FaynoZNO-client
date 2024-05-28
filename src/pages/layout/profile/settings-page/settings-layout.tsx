import React from 'react';
import { Outlet } from 'react-router-dom';

import { SettingsNavBar } from 'features/profile/settings/navbar';

import { Container, Grid } from 'shared/ui/kit';

export const SettingsLayout = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <SettingsNavBar />
        </Grid>
        <Grid item md={8} xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};