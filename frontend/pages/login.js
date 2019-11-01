import React from 'react';
import { useSelector } from 'react-redux';

import FullScreen from '../components/common/FullScreen';
import LoginForm from '../containers/auth/LoginForm';
import AuthLinkBox from '../components/auth/AuthLinkBox';
import ResultScreen from '../components/common/ResultScreen';
import Banner from '../components/common/Banner';

const Login = () => {
  const { me } = useSelector(state => state.user);

  if (me) { // 로그인 된 유저 접근 시
    return (
      <ResultScreen status="403" title="이미 로그인 상태입니다." page="/" />
    );
  }
  return (
    <FullScreen screenType="row">
      <Banner />
      <FullScreen maxWidth="350px">
        <LoginForm />
        <AuthLinkBox question="계정이 없으시다면?" pageName="회원가입" />
      </FullScreen>
    </FullScreen>
  );
};

export default Login;
