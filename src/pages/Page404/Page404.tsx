import React from 'react';
import { PAGE_404_TITLE } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import {
  BodyWrapper,
  Content,
  FooterWrapper,
  Wrapper,
} from '../../components/CommonComponents/CommonComponents';
import { FooterComponent } from '../../components/FooterComponent';

export const Page404 = () => {
  return (
    <BodyWrapper>
      <Wrapper>
        {/*todo if (auth) MainHeader else WelcomePageHeader */}
        <WelcomePageHeader />
        <Content>
          <h1>{PAGE_404_TITLE}</h1>
          <div>Error Message</div>
        </Content>
        <FooterWrapper>
          {/* <p>Footer</p> */}
          <FooterComponent />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
