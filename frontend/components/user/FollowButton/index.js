import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';

import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../../reducers/user';

const FollowButton = memo(({ userId, onFollow, onUnfollow }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleClickFollow = useCallback(() => {
    if (!me) {
      return message.error('로그인이 필요합니다..');
    }
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: userId,
    });
  }, [userId]);
  const handleClickUnfollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, [userId]);
  return (!me || userId === me.id
    ? <Button onClick={handleClickFollow}>팔로우</Button>
    : me.Followings && (me.Followings.find(v => v.id === userId)
      ? <Button onClick={handleClickUnfollow}>언팔로우</Button>
      : <Button onClick={handleClickFollow}>팔로우</Button>
    )
  );
});

FollowButton.propTypes = {
  mode: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

export default FollowButton;
