import { styled } from '@mui/system';

export const BodyWrapper = styled('div')({
  height: '100vh',
  background: 'linear-gradient(0deg, #fff, #eae6ff 100%)',
});

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  backgroundImage:
    'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2557x1600/b38a507e1f2fcf39cc1a4407f47eda4a/photo-1650892344024-fb34a919e258.jpg")',
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const FooterWrapper = styled('div')({
  marginTop: 'auto',
});

export const AlignCenter = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
