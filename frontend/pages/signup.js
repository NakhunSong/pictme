import React from 'react';

import FullScreen from '../components/common/FullScreen';
import SignupForm from '../containers/auth/SignupForm';
import AuthLinkBox from '../components/auth/AuthLinkBox';
import Banner from '../components/common/Banner';

const signup = () => {
  return (
    <FullScreen screenType="row">
      <Banner />
      <FullScreen maxWidth="350px">
        <SignupForm />
        <AuthLinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
      </FullScreen>
    </FullScreen>
  );
};

export default signup;
