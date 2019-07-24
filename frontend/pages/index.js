import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/common/AuthTemplate';
import SignupForm from '../containers/signup/SignupForm';
import LinkBox from '../components/common/LinkBox';

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
          <div>메인</div>
        )
      }
    </div>
  );
};

export default Pictme;
