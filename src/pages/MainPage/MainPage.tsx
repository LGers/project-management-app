import { Box, useScrollTrigger } from '@mui/material';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import {
  Wrapper,
  Content,
  FooterWrapper,
  BodyWrapper,
} from '../../components/CommonComponents/CommonComponents';
import { PATH } from '../../constants/common.dictionary';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { MainHeader } from '../../components/MainHeader';
import { useScroll } from './useScroll';

export const MainPage = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const { t } = useTranslation();
  const ref = useRef();
  const trigger = useScroll(ref);
  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader hide={trigger} />
        <Content ref={ref as unknown as LegacyRef<HTMLDivElement>}>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{t('mainPage.title')}</h1>
          </Box>
          <Link to={PATH.WELCOME_PAGE}>Welcome Page</Link>
          <Link to={PATH.COLUMNS}>columns</Link>
          <Link to={PATH.BOARDS}>Boards</Link>
          <p>Is Auth?: </p>
          {auth.isAuth ? <p>Is Auth</p> : <p>NOT Auth</p>}
          <p>
            {' '}
            mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
            ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Praesent commodo porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit
            amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras
            justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Prae odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Prae
          </p>
        </Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
