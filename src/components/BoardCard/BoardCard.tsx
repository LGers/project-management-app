import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';

export const BoardCard = (props: { id: string; title: string }) => {
  return (
    <Link to={PATH.BOARD + props.id}>
      <Card sx={{ minWidth: 275, mt: 1.5 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.id}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
