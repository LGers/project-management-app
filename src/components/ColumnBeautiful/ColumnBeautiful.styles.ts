import { styled } from '@mui/system';
import { Card, Paper } from '@mui/material';

export const ColumnCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flex: '1 1 auto',
  // display: 'grid',
  // gap: '10px',
  // padding: '20px',
  // backgroundColor: '#ebebeb',
  // backgroundColor: '#11ebeb',
  backgroundColor: 'transparent',
  // overflowY: 'auto', // todo now scroll all col. do it with children
  pb: '30px',
  width: '400px',
  minWidth: 400,
  // width: '100%',
  // flexGrow: 1,
  // flexShrink: 0,
  // width: '100%',

  // '&::-webkit-scrollbar': {
  //   width: '12px',
  // },
  // '&::-webkit-scrollbar-track': {
  //   background: 'rgba(106,107,114,0.1)',
  //   borderRadius: '8px',
  // },
  // '&::-webkit-scrollbar-thumb': {
  //   background: 'rgba(106,107,114,0.5)',
  //   borderRadius: '8px',
  // },
});

export const ColumnTasks = styled(Paper)({
  padding: '12px',
  transition: 'transform 0.05s ease',
  overflow: 'auto',
  borderRadius: '0 0 8px 8px',

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
  // width: '400px',
  backgroundColor: '#ebebeb',
  borderRadius: '8px 8px 0 0',
  // width: '100%',
});
