import { Stack, LinearProgress } from '@mui/material';

export const BoardCardSkeleton = () => {
  return (
    <Stack
      sx={{ width: '99%', color: 'grey.500', bgcolor: '#fff', margin: 1, padding: 3 }}
      spacing={2}
    >
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack>
  );
};
