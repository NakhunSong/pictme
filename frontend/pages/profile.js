import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import ProfileBox from '../containers/main/Profile';
import ProfileBox from '../containers/user/Profile';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import Loading from '../components/common/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  const me = useSelector(state => state.user.me && state.user.me);
  const { mainPosts } = useSelector(state => state.post);

  if (!mainPosts && !me) {
    return (
      <Loading />
    );
  }
  return (
    <ProfileBox mode="meProfile" mainPosts={mainPosts} userInfo={me} />
  );
};

Profile.getInitialProps = (context) => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Profile;
