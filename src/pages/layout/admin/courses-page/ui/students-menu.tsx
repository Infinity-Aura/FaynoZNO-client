import { useStore } from 'effector-react';
import React from 'react';

import { Box, Button, Menu } from 'shared/ui/kit';

import * as model from '../model';
import { StudentAnswers } from './student-answers';

export const StudentsMenu: React.FC<{ courseId: string; studentsIds: string[] }> = ({
  courseId,
  studentsIds,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const students = useStore(model.$students);
  const loading = useStore(model.getUsersFx.pending);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    model.studentsRequested(studentsIds);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Students
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {students?.map((student) => (
          <StudentAnswers key={student.id} courseId={courseId} student={student} />
        ))}
      </Menu>
    </Box>
  );
};
