import React from 'react';
import { useStore } from 'effector-react';

import {
  Box,
  Button,
  MenuItem,
  InputBase,
  Select,
  TextField,
  Typography,
  styled,
} from 'shared/ui/kit';
import { InsertPhotoOutlinedIcon } from 'shared/ui/icons';
import { Loading } from 'shared/components/loading';
import { API_URL } from 'shared/config';

import { sessionModel, User } from 'entities/session';

import { model } from '../model';

const BootstrapSelect = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    outlined: 'none',
    borderRadius: '8px',
    padding: '9px 11px',
    '&:focus': {
      outlined: 'none',
    },
  },
}));

export const SettingsInfoForm = () => {
  const user = useStore(sessionModel.$user);

  const [photo, setPhoto] = React.useState('');

  React.useEffect(
    () => setPhoto(user?.photo ? `${API_URL}/user/profile/${user.photo}` : ''),
    [user],
  );

  const handleFileSelect = ({ target }: { target: HTMLInputElement & EventTarget }) => {
    if (!target?.files) {
      throw new Error('Error');
    }

    setPhoto(URL.createObjectURL(target.files[0]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const photo = form.get('photo') as File;

    const data: Partial<User> = {
      firstName: (form.get('firstName')?.toString() || user?.firstName) ?? '',
      secondName: (form.get('secondName')?.toString() || user?.secondName) ?? '',
      birth: (form.get('birth')?.toString() || user?.birth) ?? '',
      gender: (form.get('gender')?.toString() || user?.gender) ?? '',
    };

    if (!data.firstName && !data.secondName && !data.birth && !data.gender && !data.photo) {
      throw new Error('Update error');
    }

    model.userUpdateRequested(data);
    model.uploadProfileImageRequested(photo);
  };

  return user ? (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Box sx={{ mb: '13px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              background: photo ? `url("${photo}") center center no-repeat` : '#44A5DC',
              backgroundSize: 'cover',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '70px',
              minWidth: '106px',
              minHeight: '106px',
              p: '31px',
              mr: '15px',
            }}
          >
            <Box></Box>
            {photo ? '' : <InsertPhotoOutlinedIcon fontSize="large" sx={{ color: '#FFFFFF' }} />}
          </Box>
          <Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Завантажте вашу фотографію...
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 200, fontFamily: '"Montserrat", sans-serif' }}
              >
                Розмір файлу не менше 300px × 300px
              </Typography>
            </Box>
            <Box>
              <Button
                component="label"
                variant="contained"
                sx={{ fontWeight: 900, fontSize: '0.8rem', lineHeight: '1.1rem', border: 'none' }}
              >
                <input
                  style={{ display: 'none' }}
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                Оберіть файл
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Ім’я
          </Typography>
          <TextField
            required
            fullWidth
            name="firstName"
            type="text"
            id="firstName"
            defaultValue={user.firstName}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Прізвище
          </Typography>
          <TextField
            required
            fullWidth
            name="secondName"
            type="text"
            id="secondName"
            defaultValue={user.secondName}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Дата народження
          </Typography>
          <TextField
            required
            fullWidth
            name="birth"
            type="date"
            id="birth"
            defaultValue={user.birth}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Стать
          </Typography>
          <Select
            fullWidth
            name="gender"
            defaultValue={user.gender || 'not-selected'}
            input={<BootstrapSelect />}
          >
            <MenuItem value="not-selected">
              <em>Не обрано</em>
            </MenuItem>
            <MenuItem value={'man'}>Чоловік</MenuItem>
            <MenuItem value={'woman'}>Жінка</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { md: 'normal', xs: 'center' },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontWeight: 900,
            fontSize: '0.8rem',
            lineHeight: '1.1rem',
            border: 'none',
            mr: '10px',
          }}
        >
          Зберегти
        </Button>
        {/* <Typography sx={{ fontWeight: 200, fontSize: '0.8rem', lineHeight: '1.1rem', mr: '2px' }}>
          або
        </Typography>
        <Button
          variant="text"
          sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', minWidth: 'auto' }}
        >
          Відміна
        </Button> */}
      </Box>
    </Box>
  ) : (
    <Loading />
  );
};
