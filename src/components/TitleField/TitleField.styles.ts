import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTitleField = styled(TextField)({
  border: '0px solid',
  outline: 0,
  fontWeight: 'bold',
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '30px',
    '& fieldset': {
      borderColor: 'red',
      border: 'none',
      fontSize: '30px',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px #0000006b',
    },
  },
});
