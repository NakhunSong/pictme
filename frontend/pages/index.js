import React from 'react';
import { useSelector } from 'react-redux';

import FullScreen from '../components/common/FullScreen';
import AuthLinkBox from '../components/auth/AuthLinkBox';
import Main from '../containers/main/Main';
import SignupForm from '../containers/auth/SignupForm';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import Banner from '../components/common/Banner';

const Home = () => {
  const { me } = useSelector(state => state.user);

  if (!me) {
    return (
      <FullScreen screenType="row">
        <Banner />
        <FullScreen maxWidth="350px">
          <SignupForm />
          <AuthLinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
        </FullScreen>
      </FullScreen>
    );
  }
  return (
    <Main />
  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
