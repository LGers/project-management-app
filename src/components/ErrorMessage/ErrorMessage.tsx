import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!!errorMessage);
  }, [errorMessage]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {t(errorMessage)}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
