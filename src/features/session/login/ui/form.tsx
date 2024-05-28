import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Box, Button, TextField } from 'shared/ui/kit';

import { Login, model } from '../model';

export const LoginForm = () => {
  const loading = useStore(model.loginFx.pending);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Login = {
      email: form.get('email')?.toString() ?? '',
      password: form.get('password')?.toString() ?? '',
    };

    if (!data.email || !data.password) {
      throw 'Login error';
    }

    model.loginRequested(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box>
        <Box>
          <TextField
            required
            fullWidth
            id="email"
            label="Ел. пошта"
            name="email"
            type="email"
            sx={{ mb: '21px' }}
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box>
          <TextField
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            sx={{ mb: '21px' }}
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
      </Box>
      <Box sx={{ mb: '21px' }}>
        <Box
          component={Link}
          to="/registration"
          sx={{
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: ' 20px',
            color: '#FFFFFF',
          }}
        >
          Відновити пароль
        </Box>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={loading}
        sx={{
          py: '25px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: 'none',
          borderRadius: '16px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.8)',
          },
        }}
      >
        Ввійти
      </Button>
    </Box>
  );
};
