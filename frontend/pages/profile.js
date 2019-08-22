import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileBox from '../containers/main/Profile';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.me && state.user.me.id);

  if (!userId) {
    return (
      <div>로딩 중</div>
    );
  }
  return (
    <ProfileBox />
  );
};

Profile.getInitialProps = (context) => {
  const { id } = context.store.getState().user.me;
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  });
};

export default Profile;
