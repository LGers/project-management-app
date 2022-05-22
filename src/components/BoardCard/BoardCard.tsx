import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { fetchBoards, fetchDeleteBoard } from '../../redux/boards/boards.thunk';
import { store } from '../../redux';

export const BoardCard = (props: { id: string; title: string }) => {
  const [open, setOpen] = useState(false);
  const onDeleteCard = () => {
    setOpen(true);
  };

  const deleteItem = () => {
    store.dispatch(fetchDeleteBoard({ id: props.id }));
    store.dispatch(fetchBoards());
  };

  return (
    <div>
      <Card sx={{ minWidth: 275, mt: 1.5, ml: 1, mr: 2, padding: '0' }}>
        <Stack direction="row" justifyContent={'space-between'} spacing={2} sx={{ width: '100%' }}>
          <Link to={PATH.BOARD + props.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.id}
              </Typography>
            </CardContent>
          </Link>
          <CardActions sx={{ p: 0 }}>
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{ height: '100%' }}
              onClick={onDeleteCard}
            >
              <DeleteIcon fontSize="large" />
            </Button>
          </CardActions>
        </Stack>
      </Card>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        itemName={'board'}
        itemTitle={props.title}
        deleteItem={deleteItem}
      />
    </div>
  );
};
