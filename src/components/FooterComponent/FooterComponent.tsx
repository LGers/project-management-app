import React from 'react';
import { AppBar, Avatar, Box, Link, Toolbar, Typography } from '@mui/material';

export const FooterComponent = () => {
  return (
    <AppBar position="static" elevation={0} component="footer">
      <Toolbar sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Avatar
              sx={{ width: 24, height: 24 }}
              src="https://avatars.githubusercontent.com/u/87089817"
            />
            <Link
              href="https://github.com/leonid"
              target="_blank"
              rel="noreferrer"
              underline="none"
              display="flex"
              gap="10px"
              style={{ alignItems: 'center' }}
            >
              <Typography color="white" sx={{ flexGrow: 1 }}>
                leonid
              </Typography>
            </Link>
          </div>
          <div>
            <Avatar
              sx={{ width: 24, height: 24 }}
              src="https://avatars.githubusercontent.com/u/87089817"
            />
            <Link
              href="https://github.com/marina"
              target="_blank"
              rel="noreferrer"
              underline="none"
              display="flex"
              gap="10px"
              style={{ alignItems: 'center' }}
            >
              <Typography color="white" sx={{ flexGrow: 1 }}>
                marina
              </Typography>
            </Link>
          </div>
          <div>
            <Avatar
              sx={{ width: 24, height: 24 }}
              src="https://avatars.githubusercontent.com/u/87089817"
            />
            <Link
              href="https://github.com/sergioivanov008"
              target="_blank"
              rel="noreferrer"
              underline="none"
              display="flex"
              gap="10px"
              style={{ alignItems: 'center' }}
            >
              <Typography color="white" sx={{ flexGrow: 1 }}>
                sergioivanov008
              </Typography>
            </Link>
          </div>
        </Box>
        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">© 2022</Typography>
          <Link href="https://rs.school/js/" underline="none" target="_blank" rel="noreferrer">
            <Typography color="white" sx={{ flexGrow: 1 }}>
              RSScool-2022
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
