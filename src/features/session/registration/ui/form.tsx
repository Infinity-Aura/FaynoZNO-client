import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Box, Button, TextField } from 'shared/ui/kit';

import { Registration, model } from '../model';

export const RegistrationForm = () => {
  const loading = useStore(model.registrationFx.pending);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Registration = {
      firstName: form.get('firstName')?.toString() ?? '',
      secondName: form.get('secondName')?.toString() ?? '',
      email: form.get('email')?.toString() ?? '',
      password: form.get('password')?.toString() ?? '',
    };

    if (!data.email || !data.password) {
      throw 'Login error';
    }

    model.registrationRequested(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box>
        <Box>
          <TextField
            required
            fullWidth
            id="firstName"
            label="Ім'я"
            name="firstName"
            sx={{ mb: '21px' }}
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box>
          <TextField
            required
            fullWidth
            id="secondName"
            label="Прізвище"
            name="secondName"
            sx={{ mb: '21px' }}
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
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
          sx={{ fontWeight: 300, fontSize: '16px', lineHeight: ' 20px', color: '#FFFFFF' }}
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
        Зареєструватись
      </Button>
    </Box>
  );
};
