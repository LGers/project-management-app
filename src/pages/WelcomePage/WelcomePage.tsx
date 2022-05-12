import { Box, Container } from '@mui/material';
import React from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { WELCOME_PAGE_TITLE } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { Footer } from '../../components/Footer';

export const WelcomePage = () => {
  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{WELCOME_PAGE_TITLE}</h1>
          </Box>
          <Container sx={{ textAlign: 'center' }}>
            <p>Project Management App</p>
            <p>RS School React 2022Q1</p>
            <p>Command 8</p>
            <p>Leonid - Marina - Sergey</p>
            <p>Mentor: Dmitriy</p>
          </Container>
        </Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
