import { styled } from '@mui/system';
import { Card } from '@mui/material';

export const ColumnCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '10px',
  padding: '10px',
  backgroundColor: '#ebebeb',
  overflowY: 'auto', // todo now scroll all col. do it with children
  pb: '30px',
  // width: '100%',

  /*'&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(106,107,114,0.1)',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(106,107,114,0.5)',
    borderRadius: '8px',
  },*/
});

export const ColumnTasks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
