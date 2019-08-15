import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileBox from '../containers/main/Profile';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.me && state.user.me.id);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: userId,
    });
  }, [userId]);

  return (
    <ProfileBox />
  );
};

export default Profile;
