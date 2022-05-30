import React from 'react';
import {
  PAGE_404_LINK_TO,
  PAGE_404_MESSAGE,
  PAGE_404_TITLE,
  PATH,
} from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { BodyWrapper, FooterWrapper, Wrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { MessageTitleBig, MessageTitleMedium, Page404Content } from './Page404Styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MainHeader } from '../../components/MainHeader';

export const Page404 = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <BodyWrapper>
      <Wrapper>
        {isAuth ? <MainHeader /> : <WelcomePageHeader />}
        <Page404Content>
          <MessageTitleBig>{t(PAGE_404_TITLE)}</MessageTitleBig>
          <MessageTitleMedium>
            {t(PAGE_404_MESSAGE)}
            <Link to={PATH.HOME}>{t(PAGE_404_LINK_TO)}</Link>
          </MessageTitleMedium>
        </Page404Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
