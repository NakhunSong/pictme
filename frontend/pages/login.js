import React from 'react';
import { useSelector } from 'react-redux';

import FullScreen from '../components/common/FullScreen';
import LoginForm from '../containers/login/LoginForm';
import LinkBox from '../components/common/LinkBox';
import ResultScreen from '../components/common/ResultScreen';

const Login = () => {
  const { me } = useSelector(state => state.user);

  if (me) { // 로그인 된 유저 접근 시
    return (
      <ResultScreen status="403" title="이미 로그인 상태입니다." page="/" />
    );
  }
  return (
    <FullScreen>
      <LoginForm />
      <LinkBox question="계정이 없으시다면?" pageName="회원가입" />
    </FullScreen>
  );
};

export default Login;
