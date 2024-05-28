import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from 'effector-react';

import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

import { sessionModel } from 'entities/session';

import { Box } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';

export const Layout = () => {
  const loading = useStore(sessionModel.$loading);

  return !loading ? (
    <>
      <Header />
      <Box sx={{ flex: '1 1 auto', py: '80px' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};
