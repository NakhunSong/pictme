import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';
import Main from '../containers/main/Main';

const Pictme = () => {
  const { me } = useSelector(state => state.user);
  return (
    <div style={{ height: '100%' }}>
      {!me
        ? (
          <AuthTemplate>
            <SignupForm />
            <LinkBox question="계정이 있으시다면?" pageName="로그인" />
          </AuthTemplate>
        )
        : (
          <Main />
        )
      }
    </div>
  );
};

export default Pictme;
