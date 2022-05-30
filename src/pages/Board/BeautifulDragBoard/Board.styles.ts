import { styled } from '@mui/system';
import { Stack } from '@mui/material';

export const BoardContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  padding: 10,
  // height: '100%',
  // justifyContent: 'space-between',
  // width: '100%',
  justifyContent: 'flex-start',
  // alignItems: 'flex-start',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '12px',
    height: 12,
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(174,176,189, 0.8)',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(106,107,114,1)',
    borderRadius: '8px',
  },
});
