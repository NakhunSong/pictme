import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import MainTemplate from '../components/main/MainTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';
import Main from '../containers/main/Main';
import Header from '../containers/main/Header';

const Pictme = () => {
  const { me } = useSelector(state => state.user);
  return (
    <div style={{ height: '100%' }}>
      {!me
        ? (
          <AuthTemplate>
            <SignupForm />
            <LinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
          </AuthTemplate>
        )
        : (
          <MainTemplate>
            <Header />
            <Main />
          </MainTemplate>
        )
      }
    </div>
  );
};

export default Pictme;
