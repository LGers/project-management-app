import { styled } from '@mui/system';

export const DragBoardWrapper = styled('div')({
  background: 'linear-gradient(0deg, #fff, #eae6ff 100%)',
  backgroundColor: 'azure',
  width: '100%',
  padding: '30px',
});

export const DragBoardContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '10px',
});

export const DragBoardColumn = styled('div')({
  width: 400,
});
