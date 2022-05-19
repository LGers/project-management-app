import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTitleField = styled(TextField)({
  border: '0px solid',
  opacity: 1,
  outline: 0,
  width: '100%',
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: 35,
    fontWeight: 'bold',
    '& fieldset': {
      borderColor: 'red',
      border: 'none',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px #0000006b',
      // backgroundColor: '#fff',
      color: '#000',
    },
  },
});
