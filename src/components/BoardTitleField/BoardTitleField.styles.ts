import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTitleField = styled(TextField)({
  border: '0px solid',
  outline: 0,
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: 35,
    fontWeight: 'bold',
    '& fieldset': {
      borderColor: 'red',
      border: 'none',
      // fontSize: 28,
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px #0000006b',
    },
  },
});
