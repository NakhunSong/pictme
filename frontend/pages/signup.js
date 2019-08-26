import React from 'react';

import FullScreen from '../components/common/FullScreen';
import SignupForm from '../containers/auth/SignupForm';
import LinkBox from '../components/common/LinkBox';

const signup = () => {
  return (
    <FullScreen>
      <SignupForm />
      <LinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
    </FullScreen>
  );
};

export default signup;
