import React from 'react';

import AuthTemplate from '../components/common/AuthTemplate';
import LoginForm from '../containers/login/LoginForm';
import LinkBox from '../components/common/LinkBox';

const Login = () => {
  return (
    <AuthTemplate>
      <LoginForm />
      <LinkBox question={"계정이 없으시다면?"} pageName={"회원가입"} />
    </AuthTemplate>
  );
};

export default Login;