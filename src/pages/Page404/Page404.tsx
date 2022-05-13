import React from 'react';
import {
  PAGE_404_LINK_TO,
  PAGE_404_MESSAGE,
  PAGE_404_TITLE,
  PATH,
} from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import {
  BodyWrapper,
  FooterWrapper,
  Wrapper,
} from '../../components/CommonComponents/CommonComponents';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { MessageTitleBig, MessageTitleMedium, Page404Content } from './Page404Styles';

export const Page404 = () => {
  return (
    <BodyWrapper>
      <Wrapper>
        {/*todo if (auth) MainHeader else WelcomePageHeader */}
        <WelcomePageHeader />
        <Page404Content>
          <MessageTitleBig>{PAGE_404_TITLE}</MessageTitleBig>
          <MessageTitleMedium>
            {PAGE_404_MESSAGE}
            <Link to={PATH.HOME}>{PAGE_404_LINK_TO}</Link>
          </MessageTitleMedium>
        </Page404Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
