import React from 'react';

import { RegistrationForm } from 'features/session/registration';

import { AuthForm } from 'entities/session';

import { Container } from 'shared/ui/kit';

export const RegistrationPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm type={'РЕЄСТРАЦІЯ'}>
        <RegistrationForm />
      </AuthForm>
    </Container>
  );
};
