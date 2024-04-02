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

async function getFileFromUrl(url: string, name: string, defaultType = 'application/pdf') {
  const response = await fetch(url);
  const data = await response.blob();
  return new Blob([data], { type: defaultType });
}

export const DocumentViewer: React.FC<{
  document: string;
}> = ({ document }) => {
  const [file, setFile] = React.useState<Blob | null>(null);

  React.useEffect(() => {
    const getFile = async () =>
      setFile(await getFileFromUrl(`${API_URL}/course/documents/${document}`, document));
    void getFile();
  }, [document]);

  return (
    <CardMedia
      title="PDF Viewer"
      component="iframe"
      src={file ? URL.createObjectURL(file) : ''}
      sx={{
        border: '1px solid lavender',
        width: '100%',
        height: '400px',
        minHeight: '700px',
      }}
    />
  );
};
