import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const ColumnCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flex: '1 1 auto',
  backgroundColor: 'transparent',
  pb: '30px',
  width: '400px',
  minWidth: 400,
});

export const ColumnTasks = styled(Paper)({
  padding: '12px',
  transition: 'transform 0.05s ease',
  overflow: 'auto',
  borderRadius: '0 0 8px 8px',
  width: 400,

  '&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(106,107,114,0.1)',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(106,107,114,0.5)',
    borderRadius: '8px',
  },
});

export const ColumnHeader = styled('div')({
  width: '400px',
  backgroundColor: '#ebebeb',
  borderRadius: '8px 8px 0 0',
});
