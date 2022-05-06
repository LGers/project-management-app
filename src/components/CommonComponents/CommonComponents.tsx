import { styled } from '@mui/system';

export const BodyWrapper = styled('div')({
  height: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(0deg, #fff, #eae6ff 100%)',
});

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const Footer = styled('div')({
  marginTop: 'auto',
});
