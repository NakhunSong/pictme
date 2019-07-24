import React from 'react';

import AuthTemplate from '../components/common/AuthTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';

const signup = () => {
  return (
    <AuthTemplate>
      <SignupForm />
      <LinkBox question="계정이 없으시다면?" pageName="회원가입" />
    </AuthTemplate>
  );
};

export default signup;
