import { styled } from '@mui/system';
import { Card } from '@mui/material';

export const ColumnCardContent = styled('div')({
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'green',
});

export const ColumnCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '10px',
  padding: '10px',
  backgroundColor: '#ebebeb',
});

export const ColumnTasks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'green',
});
