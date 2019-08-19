import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import UserInfo from '../containers/main/User';
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
  }, []);
  if (!mainPosts || !userInfo) {
    return (
      <div>로딩 중</div>
    );
  }
  return (
    // <div>테스트</div>
    <UserInfo mainPosts={mainPosts} userInfo={userInfo} />
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = (ctx) => {
  const id = parseInt(ctx.query.id, 10);
  return { id };
};

export default User;
