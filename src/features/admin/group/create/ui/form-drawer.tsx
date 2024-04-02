import React from 'react';
import { useGate, useStore } from 'effector-react';

import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from 'shared/ui/kit';
import { AddCircleRoundedIcon } from 'shared/ui/icons';

import { Group } from 'entities/group';

import { model } from '../model';

export const CreateGroupForm = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);

  useGate(model.Gate);

  const courses = useStore(model.$courses);
  const students = useStore(model.$students);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Partial<Group> = {
      title: form.get('title')?.toString() ?? '',
      number: Number(form.get('number')) ?? 0,
      studentsIds: selectedStudents,
      coursesIds: selectedCourses,
    };

    model.createGroupRequested(data);
  };

  return (
    <>
      <Button
        startIcon={<AddCircleRoundedIcon color="secondary" />}
        onClick={() => setDrawerOpen(true)}
        variant="contained"
      >
        Створити групу
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 500, mb: '10px' }}>
            Створити групу
          </Typography>
          <Box sx={{ mb: '13px' }}>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Назва
              </Typography>
              <TextField
                required
                fullWidth
                name="title"
                type="text"
                id="title"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Номер
              </Typography>
              <TextField
                required
                fullWidth
                name="number"
                type="number"
                id="number"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Студенти
              </Typography>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  multiple
                  value={selectedStudents}
                  onChange={({ target }) =>
                    Array.isArray(target.value) && setSelectedStudents(target.value)
                  }
                  renderValue={(selected) => selected.join(', ')}
                >
                  {students?.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      <Checkbox checked={selectedStudents.indexOf(student.id) > -1} />
                      <ListItemText primary={`${student.firstName} ${student.secondName}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Курси
              </Typography>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  multiple
                  value={selectedCourses}
                  onChange={({ target }) =>
                    Array.isArray(target.value) && setSelectedCourses(target.value)
                  }
                  renderValue={(selected) => selected.join(', ')}
                >
                  {courses?.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      <Checkbox checked={selectedCourses.indexOf(course.id) > -1} />
                      <ListItemText primary={course.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              Створити
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
