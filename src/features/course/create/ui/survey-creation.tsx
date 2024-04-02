import React from 'react';
import { useGate, useStore } from 'effector-react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from 'shared/ui/kit';

import { SurveyData, SurveyEditor, SurveyType } from 'shared/components/editor';
import { CloseIcon, DeleteIcon } from 'shared/ui/icons';

const EMPTY_QUESTION: SurveyData = {
  name: '',
  title: '',
  type: 'text',
};

export const AdminCourseSurveyCreation: React.FC<{
  data: SurveyData[];
  onSave: (data: SurveyData[]) => void;
}> = ({ data, onSave }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openQuestion, setOpenQuestion] = React.useState<boolean>(false);
  const [surveyData, setSurveyData] = React.useState<SurveyData[]>([]);
  const [question, setQuestion] = React.useState<SurveyData>(EMPTY_QUESTION);

  React.useEffect(() => setSurveyData(data), [data]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onSave(surveyData);
    setOpen(false);
  };

  const handleOpenQuestion = () => setOpenQuestion(true);
  const handleCloseQuestion = () => {
    setQuestion(EMPTY_QUESTION);
    setOpenQuestion(false);
  };

  const handleSaveQuestion = () => {
    question && setSurveyData([...surveyData, question]);
    setQuestion(EMPTY_QUESTION);
    setOpenQuestion(false);
  };

  const handleChangeQuestion = (newQuestion: Partial<SurveyData>) => {
    setQuestion({ ...question, ...newQuestion });
  };

  const handleDeleteQuestion = (questionName: string) => {
    setSurveyData(surveyData.filter((question) => questionName !== question.name));
  };

  return (
    <>
      <Button onClick={handleOpen}>Open survey editor</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>Create survey</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <List sx={{ maxHeight: 200, overflowY: 'scroll' }}>
              {surveyData.map((question) => (
                <ListItem key={question.name} disablePadding>
                  <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">{question.name}</Typography>
                    <Typography variant="body2">{question.title}</Typography>
                    <Typography variant="body2">{question.type}</Typography>
                  </ListItemButton>
                  <IconButton onClick={() => handleDeleteQuestion(question.name)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Button variant="contained" onClick={handleOpenQuestion}>
              Add question
            </Button>
            <Dialog open={openQuestion} onClose={handleCloseQuestion}>
              <DialogTitle sx={{ m: 0, p: 2 }}>Create question</DialogTitle>
              <IconButton
                onClick={handleCloseQuestion}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Box>
                  <TextField
                    label="Name"
                    variant="filled"
                    value={question?.name}
                    onChange={(event) => handleChangeQuestion({ name: event.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Title"
                    variant="filled"
                    value={question?.title}
                    onChange={(event) => handleChangeQuestion({ title: event.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="type">Age</InputLabel>
                    <Select
                      labelId="type"
                      label="Age"
                      value={question?.type}
                      onChange={(event) =>
                        handleChangeQuestion({ type: event.target.value as SurveyType })
                      }
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="text">text</MenuItem>
                      <MenuItem value="checkbox">checkbox</MenuItem>
                      <MenuItem value="radiogroup">radiogroup</MenuItem>
                      <MenuItem value="boolean">boolean</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" autoFocus onClick={handleSaveQuestion}>
                  Save question
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box sx={{ maxHeight: 500, overflowY: 'scroll' }}>
            <SurveyEditor data={surveyData} preview />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
