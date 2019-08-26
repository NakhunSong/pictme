import React from 'react';
import { useSelector } from 'react-redux';

import { LOAD_FOLLOWINGS_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';
import FollowList from '../containers/user/FollowList';
import Loading from '../components/common/Loading';

const Following = () => {
  const { followingList, userInfo } = useSelector(state => state.user);

  if (!followingList || !userInfo) {
    return (
      <Loading />
    );
  }
  return (
    <FollowList title="팔로잉" followList={followingList} userInfo={userInfo} />
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
