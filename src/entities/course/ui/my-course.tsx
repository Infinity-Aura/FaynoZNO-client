import React from 'react';

import {
  Box,
  CardMedia,
  Collapse,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
} from 'shared/ui/kit';
import {
  AccessTimeRoundedIcon,
  FormatListBulletedRoundedIcon,
  InsertDriveFileIcon,
  LinkIcon,
} from 'shared/ui/icons';

import { Course } from '../model/types';
import { SurveyAnswerData, SurveyData, SurveyEditor } from 'shared/components/editor';
import { API_URL } from 'shared/config';

import NoImage from 'shared/assets/images/no-image.png';
import { isValidFileName } from 'shared/lib/utils';
import { DocumentViewer } from './document-viewer';

async function getFileFromUrl(url: string, name: string, defaultType = 'application/pdf') {
  const response = await fetch(url);
  const data = await response.blob();
  return new Blob([data], { type: defaultType });
}

export const MyCourse: React.FC<{
  course: Course;
  onSurveySave: (result: {
    courseId: string;
    blockTitle: string;
    answer: SurveyAnswerData;
    surveyData: SurveyData[];
  }) => void;
}> = ({ course, onSurveySave }) => {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>([]);
  const [openMediaDialog, setOpenMediaDialog] = React.useState(false);

  const handleExpandClick = (index: number) => {
    setExpanded({ ...expanded, [index]: !expanded[index] });
  };

  const handleClickOpenMediaDialog = () => {
    setOpenMediaDialog(true);
  };

  const handleCloseMediaDialog = () => {
    setOpenMediaDialog(false);
  };

  return (
    <Box>
      <Grid container spacing={8} sx={{ mb: '33px' }}>
        <Grid item md={5} xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              p: '11px',
              mb: '14px',
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                <FormatListBulletedRoundedIcon fontSize="large" sx={{ mr: '10px' }} />
                {course.lessonsCount} lesson
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                <AccessTimeRoundedIcon fontSize="large" sx={{ mr: '10px' }} />
                {course.duration}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              p: '11px',
              mb: '14px',
            }}
          >
            <Typography variant="h4" sx={{ textAlign: 'center', mb: '13px' }}>
              {course.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}
            >
              {course.subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              background: '#44A5DC',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              p: '11px',
            }}
          >
            <Typography variant="h4" color="secondary" sx={{ textAlign: 'center' }}>
              Оберіть блок
            </Typography>
          </Box>
        </Grid>
        <Grid item md={7} xs={12}>
          <Box
            component="img"
            src={
              isValidFileName(course.image) ? `${API_URL}/course/image/${course.image}` : NoImage
            }
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '21px',
              width: '100%',
              maxHeight: 300,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpenMediaDialog}>
            Медіа
          </Button>
          <Dialog open={openMediaDialog} onClose={handleCloseMediaDialog}>
            <DialogTitle>Посилання</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <List sx={{ maxHeight: 300, overflowY: 'scroll' }}>
                {course.media.map((item) => (
                  <a
                    key={item.link}
                    href={item.type === 'link' ? item.link : `${API_URL}/course/media/${item.link}`}
                    download={item.type !== 'link' && item.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ListItem>
                      <ListItemIcon>
                        {item.type !== 'link' ? <InsertDriveFileIcon /> : <LinkIcon />}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </a>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseMediaDialog}>Закрити</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {course.blocks.map(({ title, subtitle, video, document, survey, surveyData }, index) => (
          <Grid key={title} item xs={12}>
            <Box
              onClick={() => handleExpandClick(index)}
              sx={{
                background: '#FFFFFF',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '24px',
                py: '10px',
                px: '20px',
                cursor: 'pointer',
              }}
            >
              {title}
            </Box>
            <Collapse
              in={expanded[index]}
              timeout="auto"
              unmountOnExit
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Typography variant="h4" sx={{ textAlign: 'center', mb: '10px', mt: '21px' }}>
                {subtitle}
              </Typography>
              {!!video && (
                <Box
                  sx={{
                    display: 'flex',
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '16px',
                    maxWidth: '700px',
                    maxHeight: '300px',
                    mx: 'auto',
                    mb: '45px',
                  }}
                >
                  <CardMedia
                    component="video"
                    image={video}
                    controls
                    sx={{ borderRadius: '16px' }}
                  />
                </Box>
              )}
              {!!document && (
                <Box
                  sx={{
                    display: 'flex',
                    mx: 'auto',
                    mb: '45px',
                  }}
                >
                  <DocumentViewer document={document} />
                </Box>
              )}
              {!!survey && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFFFFF',
                    border: '1px solid lavender',
                    borderRadius: '21px',
                    mx: 'auto',
                    mb: '45px',
                  }}
                >
                  <Typography variant="h4" sx={{ textAlign: 'center', mb: '10px', mt: '21px' }}>
                    Тест
                  </Typography>
                  <CardMedia
                    title="Google Form"
                    component="iframe"
                    src={survey}
                    sx={{
                      width: '100%',
                      minHeight: '500px',
                    }}
                  />
                </Box>
              )}
              {!!surveyData?.length && (
                <Card sx={{ p: 2 }}>
                  <Typography variant="h4" sx={{ textAlign: 'center', mb: '10px' }}>
                    Тест
                  </Typography>
                  <SurveyEditor
                    data={surveyData}
                    onChange={(answer) =>
                      onSurveySave({ courseId: course.id, blockTitle: title, answer, surveyData })
                    }
                  />
                </Card>
              )}
            </Collapse>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
