import React from 'react';
import { useSelector } from 'react-redux';

import FullScreen from '../components/common/FullScreen';
import LinkBox from '../components/common/LinkBox';
import Main from '../containers/main/Main';
import SignupForm from '../containers/signup/SignupForm';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  // const { mainPosts } = useSelector(state => state.post);

  if (!me) {
    return (
      <FullScreen>
        <SignupForm />
        <LinkBox question="계정을 가지고 계신가요?" pageName="로그인" />
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
