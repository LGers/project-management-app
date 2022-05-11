import React from 'react';
import { AppBar, Avatar, Box, Link, Toolbar, Typography } from '@mui/material';
import { FOOTER_DATA, TEAM } from '../../constants/common.dictionary';
import { IFooterTeamMember } from './FooterComponent.types';

export const FooterComponent = () => {
  const team = TEAM;
  return (
    <AppBar position="static" elevation={0} component="footer">
      <Toolbar sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">{FOOTER_DATA.FOOTER_YEAR}</Typography>
          <Box sx={{ display: 'flex' }}>
            {team.map((el: IFooterTeamMember): JSX.Element => {
              return (
                <Link
                  key={el.id}
                  href={el.link}
                  target="_blank"
                  rel="noreferrer"
                  underline="none"
                  display="flex"
                  gap="10px"
                  style={{ alignItems: 'center', marginRight: '30px' }}
                >
                  <Avatar sx={{ width: 24, height: 24 }} src={el.avatar} />
                  <Typography color="white" sx={{ flexGrow: 1 }}>
                    {el.name}
                  </Typography>
                </Link>
              );
            })}
          </Box>
          <Link href={FOOTER_DATA.FOOTER_LINK} underline="none" target="_blank" rel="noreferrer">
            <img src={FOOTER_DATA.FOOTER_LOGO} width="105px" height="39px" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
