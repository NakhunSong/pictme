import React from 'react';
import { useSelector } from 'react-redux';

import FullScreen from '../components/common/FullScreen';
import LinkBox from '../components/common/LinkBox';
import Main from '../containers/main/Main';
import SignupForm from '../containers/signup/SignupForm';

const Pictme = () => {
  const { me } = useSelector(state => state.user);

  if (me) {
    return (
      <Main />
    );
  }
  return (
    <FullScreen>
      <SignupForm />
      <LinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
    </FullScreen>
    // <div style={{ height: '100%' }}>
    //   {!me
    //     ? (
    //     )
    //   }
    // </div>
  );
};

export default Pictme;
