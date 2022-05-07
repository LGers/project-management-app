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
  alignItems: 'center',
  justifyContent: 'center',
});

export const MessageTitleBig = styled('div')({
  fontSize: '5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#d21919',
});

export const MessageTitleMedium = styled('div')({
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#1976d2',
});

export const FooterWrapper = styled('div')({
  marginTop: 'auto',
});
