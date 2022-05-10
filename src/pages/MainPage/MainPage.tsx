import { Box } from '@mui/material';
import React from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { MAIN_PAGE_TITLE, PATH } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { Link } from 'react-router-dom';
import { FooterComponent } from '../../components/FooterComponent';

export const MainPage = () => {
  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{MAIN_PAGE_TITLE}</h1>
          </Box>
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
        </Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <FooterComponent />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
