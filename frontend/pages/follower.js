import React from 'react';
import { useSelector } from 'react-redux';

import { LOAD_USER_REQUEST, LOAD_FOLLOWERS_REQUEST } from '../reducers/user';
import FollowList from '../containers/user/FollowList';
import Loading from '../components/common/Loading';

const Follower = () => {
  const { followerList, userInfo } = useSelector(state => state.user);

  if (!followerList || !userInfo) {
    return (
      <Loading />
    );
  }
  return (
    <FollowList title="팔로워" followList={followerList} userInfo={userInfo} />
  );
};

Follower.getInitialProps = (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
};

export default Follower;
