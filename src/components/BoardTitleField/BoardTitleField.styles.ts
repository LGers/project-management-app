import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTitleField = styled(TextField)({
  border: '0px solid',
  opacity: 1,
  outline: 0,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    fontSize: 35,
    fontWeight: 'bold',
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
