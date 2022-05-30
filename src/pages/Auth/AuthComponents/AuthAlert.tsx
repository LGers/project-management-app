import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Collapse, IconButton } from '@mui/material';
import { resetErrorMessage } from '../../../redux/auth/auth.slice';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { RootState } from '../../../redux/store';

export const AuthAlert = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.error.message) {
      setOpen(true);
    } else setOpen(false);
  }, [auth.error.message]);

  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              dispatch(resetErrorMessage());
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {auth.error.message}
      </Alert>
    </Collapse>
  );
};
