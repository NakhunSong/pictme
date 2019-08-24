import React from 'react';
import { useSelector } from 'react-redux';

import { LOAD_FOLLOWINGS_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';
import FollowList from '../containers/user/FollowList';

const Following = () => {
  const { followingList, userInfo } = useSelector(state => state.user);

  if (!followingList || !userInfo) {
    return (
      <div>로딩 중</div>
    );
  }
  return (
    <FollowList title="팔로잉" followingList={followingList} userInfo={userInfo} />
  );
};

Following.getInitialProps = (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
};

export default Following;
