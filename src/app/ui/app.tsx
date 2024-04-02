import React from 'react';
import { useGate } from 'effector-react';

import { GlobalStyles } from 'shared/ui/kit';
import { globalStyles } from 'shared/ui/theme';
import { NotifyContainer } from 'shared/ui/lib/notify-user';

import { sessionModel } from 'entities/session';

import { Routes } from 'pages';

export const App = () => {
  useGate(sessionModel.Gate);

  return (
    <>
      <NotifyContainer />
      <Routes />
      <GlobalStyles styles={globalStyles} />
    </>
  );
};
