import React from 'react';

import AuthTemplate from '../components/common/AuthTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';

const Pictme = () => {
  return (
    <AuthTemplate>
      <SignupForm />
      <LinkBox question={"계정이 있으시다면?"} pageName={"로그인"} />
    </AuthTemplate>
  );
};

export default Pictme;