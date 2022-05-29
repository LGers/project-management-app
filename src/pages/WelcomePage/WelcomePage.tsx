import { Box, Container, Typography } from '@mui/material';
import React, { LegacyRef, useRef } from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { Footer } from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import { useScroll } from '../MainPage/useScroll';

export const WelcomePage = () => {
  const { t } = useTranslation();

  const ref = useRef();
  const trigger = useScroll(ref);

  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader hide={trigger} />
        <Content ref={ref as unknown as LegacyRef<HTMLDivElement>}>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('Welcome to Lemasello')}</h1>
          </Box>
          <Container sx={{ textAlign: 'center' }}>
            <div
              style={{
                marginTop: 80,
                backgroundColor: 'white',
                borderRadius: 10,
                opacity: 0.7,
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textShadow: '1px 1px 20px white, 0 0 20em red, 0 0 0.2em black',
                }}
              >
                <p style={{ fontSize: 32 }}>{t('Project Management App')}</p>
                <p>RS School React 2022Q1</p>
                <div style={{ fontSize: 32 }}>
                  <p>{t('Command 8')}</p>
                  <p>
                    👽{t('Leonid')} - 😀{t('Marina')} - 🎅{t('Sergey')}
                  </p>
                  <p>
                    {t('Mentor')}:💪{t('Dmitriy')}
                  </p>
                </div>
              </Typography>
            </div>
          </Container>
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
