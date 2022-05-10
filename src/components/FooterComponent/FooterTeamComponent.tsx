import React from 'react';
import { Link, Typography } from '@mui/material';
import { TEAMS } from '../../constants/common.dictionary';
import { IFooterTeamMember } from './FooterTypes';

export const FooterTeamComponent = () => {
  return TEAMS.map((el: IFooterTeamMember) => {
    <Link
      href={el.link}
      target="_blank"
      rel="noreferrer"
      underline="none"
      display="flex"
      gap="10px"
      style={{ alignItems: 'center' }}
    >
      <Typography color="white" sx={{ flexGrow: 1 }}>
        {el.name}
      </Typography>
    </Link>;
  });
};
