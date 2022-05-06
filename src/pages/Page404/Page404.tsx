import React from 'react';
import { PAGE_404_TITLE } from '../../constants/common.dictionary';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import {
  BodyWrapper,
  Content,
  Footer,
  Wrapper,
} from '../../components/CommonComponents/CommonComponents';

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
        <Footer>
          <p>Footer</p>
        </Footer>
      </Wrapper>
    </BodyWrapper>
  );
};
