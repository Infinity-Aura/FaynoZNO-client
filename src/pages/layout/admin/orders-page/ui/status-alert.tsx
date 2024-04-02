import React from 'react';

import { Alert } from 'shared/ui/kit';
import { HourglassBottomRoundedIcon } from 'shared/ui/icons';

const statusDict: Record<string, React.ReactNode> = {
  Approved: (
    <Alert
      variant="filled"
      severity="success"
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      Approved
    </Alert>
  ),
  Pending: (
    <Alert
      variant="filled"
      severity="warning"
      icon={<HourglassBottomRoundedIcon fontSize="inherit" />}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      Pending
    </Alert>
  ),
  Denied: (
    <Alert
      variant="filled"
      severity="error"
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      Denied
    </Alert>
  ),
};

export const StatusAlert: React.FC<{ status: string }> = ({ status }) => {
  return <>{statusDict[status]}</>;
};
