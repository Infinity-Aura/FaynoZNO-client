import React from 'react';

import { SettingsInfoForm } from 'features/profile/settings/info';

import { SettingsForm } from 'entities/profile/settings';

export const SettingsInfoPage = () => {
  return (
    <SettingsForm type={'Основна інформація'}>
      <SettingsInfoForm />
    </SettingsForm>
  );
};
