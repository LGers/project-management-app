import { styled } from '@mui/system';
import { STANDARD_PADDING } from '../../constants/common.dictionary';

export const MainHeaderWrapper = styled('div')({
  position: 'sticky',
  padding: STANDARD_PADDING,
});

export const JustifySpaceBetween = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});
