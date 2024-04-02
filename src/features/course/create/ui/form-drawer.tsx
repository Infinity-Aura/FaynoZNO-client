import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from 'shared/ui/kit';
import { AddCircleRoundedIcon, InsertDriveFileIcon, LinkIcon } from 'shared/ui/icons';

import { Course, CourseBlock } from 'entities/course';

import * as model from '../model';
import { AdminCourseSurveyCreation } from './survey-creation';
import { SurveyData } from 'shared/components/editor';

const extractLastPartFromUrl = (url: string) => {
  const parts = url.split('/');

  return parts[parts.length - 1];
};

const surveyJson: SurveyData[] = [
  {
    name: 'FirstName',
    title: 'Enter your first name:',
    type: 'text',
  },
  {
    name: 'checkbox',
    title: 'checkbox',
    type: 'checkbox',
  },
  {
    name: 'radiogroup',
    title: 'radiogroup',
    type: 'radiogroup',
  },
  {
    name: 'boolean',
    title: 'boolean',
    type: 'boolean',
  },
];

const DEFAULT_MEDIA_LINK = { name: '', link: '', type: 'link' };

export const CreateCourseForm = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [infoFields, setInfoFields] = React.useState([{ title: '', subtitle: '' }]);
  const [blockFields, setBlockFields] = React.useState<CourseBlock[]>([
    {
      title: '',
      subtitle: '',
      video: '',
      document: '',
      survey: '',
      surveyData: [],
    },
  ]);
  const [openMediaDialog, setOpenMediaDialog] = React.useState(false);
  const [openMediaLinkDialog, setOpenMediaLinkDialog] = React.useState(false);
  const [media, setMedia] = React.useState<
    { name: string; link: string; file?: File; type: string }[]
  >([]);
  const [documents, setDocuments] = React.useState<File[]>([]);
  const [mediaLink, setMediaLink] = React.useState<{ name: string; link: string; type: string }>(
    DEFAULT_MEDIA_LINK,
  );

  const handleClickOpenMediaDialog = () => {
    setOpenMediaDialog(true);
  };

  const handleCloseMediaDialog = () => {
    setOpenMediaDialog(false);
  };

  const handleClickOpenMediaLinkDialog = () => {
    setOpenMediaLinkDialog(true);
  };

  const handleCloseMediaLinkDialog = () => {
    setOpenMediaLinkDialog(false);
    setMediaLink(DEFAULT_MEDIA_LINK);
  };

  const handleMediaFilesSelect = ({ target }: { target: HTMLInputElement & EventTarget }) => {
    if (!target?.files) {
      throw new Error('Error');
    }

    setMedia((prev) => [
      ...prev,
      ...Array.from(target.files as unknown as File[]).map((file) => ({
        name: file.name,
        link: URL.createObjectURL(file),
        file: file,
        type: file.type,
      })),
    ]);
  };

  const handleDocumentSelect = (
    index: number,
    { target }: { target: HTMLInputElement & EventTarget },
  ) => {
    if (!target?.files) {
      throw new Error('Error');
    }

    setDocuments((prev) => [...prev, ...(target?.files ?? [])]);
    handleBlockFieldChange(index, 'document', {
      target: { ...target, value: target?.files[0].name },
    });
  };

  const handleMediaLinksSelect = () => {
    setMedia((prev) => [...prev, mediaLink]);
    handleCloseMediaLinkDialog();
    setMediaLink(DEFAULT_MEDIA_LINK);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const image = form.get('image') as File;

    const data: Partial<Course> = {
      title: form.get('title')?.toString() ?? '',
      subtitle: form.get('subtitle')?.toString() ?? '',
      image: '',
      lessonsCount: +(form.get('lessonsCount')?.toString() ?? 0),
      duration: form.get('duration')?.toString() ?? '',
      description: {
        info: infoFields,
      },
      blocks: blockFields,
      media: media.map((item) =>
        item.type === 'link'
          ? { ...item, link: item.link as unknown as string }
          : { ...item, link: item.name },
      ),
      teachers: [],
      students: [],
      cost: {
        oldPrice: +(form.get('cost.oldPrice')?.toString() ?? 0),
        newPrice: +(form.get('cost.newPrice')?.toString() ?? 0),
      },
    };

    model.createCourseRequested({
      course: data,
      media: media.flatMap(({ file }) => file ?? []),
      image,
      documents: documents.flatMap((document) => document ?? []),
    });
  };

  const addInfoField = () => {
    setInfoFields([...infoFields, { title: '', subtitle: '' }]);
  };

  const removeInfoField = (index: number) => {
    const newFields = [...infoFields];
    newFields.splice(index, 1);
    setInfoFields(newFields);
  };

  const handleInfoFieldChange = (
    index: number,
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newFields: Record<string, string>[] = [...infoFields];
    newFields[index][field] = event.target.value;
    const formattedFields = newFields.map((field) => ({
      title: field.title,
      subtitle: field.subtitle,
    }));
    setInfoFields(formattedFields);
  };

  const addBlockField = () => {
    setBlockFields([
      ...blockFields,
      {
        title: '',
        subtitle: '',
        video: '',
        document: '',
        survey: '',
        surveyData: [],
      },
    ]);
  };

  const removeBlockField = (index: number) => {
    const newFields = [...blockFields];
    newFields.splice(index, 1);
    setBlockFields(newFields);
  };

  const handleBlockFieldChange = (
    index: number,
    field: string,
    event: Partial<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>> | SurveyData[],
  ) => {
    const newFields: Record<string, string | SurveyData[]>[] = [...blockFields];
    newFields[index][field] = Array.isArray(event) ? event : event.target?.value ?? '';
    const formattedFields = newFields.map((field) => ({
      title: field.title as string,
      subtitle: field.subtitle as string,
      video: field.video as string,
      document: field.document as string,
      survey: (field.survey as string).replace('usp=sf_link', 'embedded=true'),
      surveyData: field.surveyData as SurveyData[],
    }));
    setBlockFields(formattedFields);
  };

  return (
    <>
      <Button
        startIcon={<AddCircleRoundedIcon color="secondary" />}
        onClick={() => setDrawerOpen(true)}
        variant="contained"
      >
        Створити курс
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 500, mb: '10px' }}>
            Створити курс
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
                Підзаголовок
              </Typography>
              <TextField
                required
                fullWidth
                name="subtitle"
                type="text"
                id="subtitle"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Button component="label" variant="contained">
                <input
                  style={{ display: 'none' }}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
                Обрати картинку
              </Button>
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Кількість занять
              </Typography>
              <TextField
                required
                fullWidth
                name="lessonsCount"
                type="text"
                id="lessonsCount"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Час
              </Typography>
              <TextField
                required
                fullWidth
                name="duration"
                type="text"
                id="duration"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Button onClick={handleClickOpenMediaDialog}>Додати медіа</Button>
              <Dialog open={openMediaDialog} onClose={handleCloseMediaDialog}>
                <DialogTitle>Медіа</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button component="label" variant="contained">
                      <input
                        style={{ display: 'none' }}
                        id="media"
                        name="media"
                        type="file"
                        multiple
                        onChange={handleMediaFilesSelect}
                      />
                      Додати файли
                    </Button>
                    <Button variant="contained" onClick={handleClickOpenMediaLinkDialog}>
                      Додати посилання
                    </Button>
                    <Dialog open={openMediaLinkDialog} onClose={handleCloseMediaLinkDialog}>
                      <DialogTitle>Посилання</DialogTitle>
                      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                          value={mediaLink.name}
                          required
                          fullWidth
                          name="media.name"
                          type="text"
                          id="media.name"
                          placeholder="Link Name"
                          onChange={(event) =>
                            setMediaLink((prev) => ({ ...prev, name: event.target.value }))
                          }
                          sx={{ borderRadius: '8px', mr: 1 }}
                          inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                          InputLabelProps={{ style: { fontWeight: 300 } }}
                        />
                        <TextField
                          value={mediaLink.link}
                          required
                          fullWidth
                          name="media.link"
                          type="text"
                          id="media.link"
                          placeholder="Link"
                          onChange={(event) =>
                            setMediaLink((prev) => ({ ...prev, link: event.target.value }))
                          }
                          sx={{ borderRadius: '8px', mr: 1 }}
                          inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                          InputLabelProps={{ style: { fontWeight: 300 } }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button variant="contained" onClick={handleMediaLinksSelect}>
                          Добавити
                        </Button>
                        <Button onClick={handleCloseMediaLinkDialog}>Закрити</Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                  <Box>
                    <Typography variant="h4">Медіа</Typography>
                    <List sx={{ maxHeight: 300, overflowY: 'scroll' }}>
                      {media.map((file) => (
                        <a
                          key={file.link as string}
                          href={file.link as string}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ListItem>
                            <ListItemIcon>
                              {file.type !== 'link' ? <InsertDriveFileIcon /> : <LinkIcon />}
                            </ListItemIcon>
                            <ListItemText primary={file.name} />
                          </ListItem>
                        </a>
                      ))}
                    </List>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseMediaDialog}>Закрити</Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Інформація
              </Typography>
              {infoFields.map((field, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    required
                    fullWidth
                    name="description.info.title"
                    type="text"
                    id="description.info.title"
                    placeholder="Заголовок"
                    onChange={(event) => handleInfoFieldChange(index, 'title', event)}
                    sx={{ borderRadius: '8px', mr: 1 }}
                    inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                    InputLabelProps={{ style: { fontWeight: 300 } }}
                  />
                  <TextField
                    required
                    fullWidth
                    name="description.info.subtitle"
                    type="text"
                    id="description.info.subtitle"
                    placeholder="Підзаголовок"
                    onChange={(event) => handleInfoFieldChange(index, 'subtitle', event)}
                    sx={{ borderRadius: '8px', mr: 1 }}
                    inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                    InputLabelProps={{ style: { fontWeight: 300 } }}
                  />
                  <Button onClick={() => removeInfoField(index)}>Remove</Button>
                </Box>
              ))}
              <Button onClick={addInfoField}>Add Field</Button>
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Блоки
              </Typography>
              {blockFields.map((field, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      name="blocks.title"
                      type="text"
                      id="blocks.title"
                      placeholder="Заголовок"
                      onChange={(event) => handleBlockFieldChange(index, 'title', event)}
                      sx={{ borderRadius: '8px', mr: 1 }}
                      inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                      InputLabelProps={{ style: { fontWeight: 300 } }}
                    />
                    <TextField
                      required
                      fullWidth
                      name="blocks.subtitle"
                      type="text"
                      id="blocks.subtitle"
                      placeholder="Підзаголовок"
                      onChange={(event) => handleBlockFieldChange(index, 'subtitle', event)}
                      sx={{ borderRadius: '8px', mr: 1 }}
                      inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                      InputLabelProps={{ style: { fontWeight: 300 } }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      name="blocks.video"
                      type="text"
                      id="blocks.video"
                      placeholder="Посилання на відео"
                      onChange={(event) => handleBlockFieldChange(index, 'video', event)}
                      sx={{ borderRadius: '8px', mr: 1 }}
                      inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                      InputLabelProps={{ style: { fontWeight: 300 } }}
                    />
                    <Button component="label" variant="contained" fullWidth>
                      <input
                        style={{ display: 'none' }}
                        id="media"
                        name="media"
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => handleDocumentSelect(index, event)}
                      />
                      Додати PDF документ
                    </Button>
                    {/*<TextField*/}
                    {/*  required*/}
                    {/*  fullWidth*/}
                    {/*  name="blocks.document"*/}
                    {/*  type="text"*/}
                    {/*  id="blocks.document"*/}
                    {/*  placeholder="Файл PDF документ"*/}
                    {/*  onChange={(event) => handleBlockFieldChange(index, 'document', event)}*/}
                    {/*  sx={{ borderRadius: '8px', mr: 1 }}*/}
                    {/*  inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}*/}
                    {/*  InputLabelProps={{ style: { fontWeight: 300 } }}*/}
                    {/*/>*/}
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      name="blocks.survey"
                      type="text"
                      id="blocks.survey"
                      placeholder="Посилання на Google Forms"
                      onChange={(event) => handleBlockFieldChange(index, 'survey', event)}
                      sx={{ borderRadius: '8px', mr: 1 }}
                      inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                      InputLabelProps={{ style: { fontWeight: 300 } }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <AdminCourseSurveyCreation
                      data={field.surveyData}
                      onSave={(data: SurveyData[]) =>
                        handleBlockFieldChange(index, 'surveyData', data)
                      }
                    />
                  </Box>
                  <Button onClick={() => removeBlockField(index)}>Remove</Button>
                </Box>
              ))}
              <Button onClick={addBlockField}>Add Field</Button>
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Ціна
              </Typography>
              <TextField
                required
                fullWidth
                name="cost.oldPrice"
                type="text"
                id="cost.oldPrice"
                placeholder="Стара ціна"
                sx={{ borderRadius: '8px', mb: 2 }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
              <TextField
                required
                fullWidth
                name="cost.newPrice"
                type="text"
                id="cost.newPrice"
                placeholder="Нова ціна"
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
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
