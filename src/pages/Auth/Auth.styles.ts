import { styled } from '@mui/system';

export const AuthContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  columnGap: '20px',
  rowGap: '20px',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const AuthForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  columnGap: '20px',
  rowGap: '20px',
  backgroundColor: '#fff',
  boxShadow: 'rgb(0 0 0 / 10%) 0 0 10px',
  padding: '10px 20px 50px 20px',
  minWidth: '378px',
});
