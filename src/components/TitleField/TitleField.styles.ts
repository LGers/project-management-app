import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTitleField = styled(TextField)({
  border: 'none',
  outline: 0,
  fontWeight: 'bold',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    fontSize: '30px',
    boxSizing: 'border-box',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px #0000006b',
    },
  },
});
