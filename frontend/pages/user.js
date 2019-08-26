import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import ProfileBox from '../containers/user/Profile';
import Loading from '../components/common/Loading';

const User = ({ id }) => {
  const { userInfo } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  if (!mainPosts || !userInfo) {
    return (
      <Loading />
    );
  }
  return (
    <ProfileBox
      mode="userProfile"
      mainPosts={mainPosts}
      userInfo={userInfo}
    />
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = (context) => {
  const id = parseInt(context.query.id, 10);
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
  return { id };
};

export default User;
