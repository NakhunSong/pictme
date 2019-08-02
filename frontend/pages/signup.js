import React from 'react';

import AuthTemplate from '../components/auth/AuthTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';

const signup = () => {
  return (
    <AuthTemplate>
      <SignupForm />
      <LinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
    </AuthTemplate>
  );
};

export default signup;
