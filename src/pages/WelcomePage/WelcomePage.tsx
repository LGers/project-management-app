import { Box, Container } from '@mui/material';
import React from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { useTranslation } from 'react-i18next';

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('Welcome to Lemasello')}</h1>
          </Box>
          <Container sx={{ textAlign: 'center' }}>
            <p>{t('Project Management App')}</p>
            <p>RS School React 2022Q1</p>
            <p>{t('Command 8')}</p>
            <p>
              {t('Leonid')} - {t('Marina')} - {t('Sergey')}
            </p>
            <p>
              {t('Mentor')}: {t('Dmitriy')}
            </p>
          </Container>
        </Content>
        <FooterWrapper>
          <p>Footer</p>
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
