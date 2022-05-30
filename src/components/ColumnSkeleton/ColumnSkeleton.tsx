import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';

export const ColumnSkeleton = () => {
  return (
    <Card
      sx={{
        bglocor: '#ebebeb',
        opacity: 0.95,
        width: 400,
        pl: 1,
        pr: 1,
        height: 400,
        ml: 1,
        mt: 1,
      }}
    >
      <Stack spacing={1}>
        <Skeleton variant="text" height={60} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={118} />
        <Skeleton variant="rectangular" height={40} width={120} />
      </Stack>
    </Card>
  );
};
