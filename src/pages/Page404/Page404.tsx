import React from 'react';
import { PAGE_404_TITLE, PATH } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import {
  BodyWrapper,
  Content,
  FooterWrapper,
  Wrapper,
  MessageTitleBig,
  MessageTitleMedium,
} from '../../components/CommonComponents/CommonComponents';
import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <BodyWrapper>
      <Wrapper>
        {/*todo if (auth) MainHeader else WelcomePageHeader */}
        <WelcomePageHeader />
        <Content>
          <MessageTitleBig>{PAGE_404_TITLE}</MessageTitleBig>
          <MessageTitleMedium>
            Something wrong, you can back to <Link to={PATH.HOME}>main page</Link>
          </MessageTitleMedium>
        </Content>
        <FooterWrapper>
          <p>Footer</p>
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
