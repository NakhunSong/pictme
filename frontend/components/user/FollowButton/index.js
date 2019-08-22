import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const FollowButton = ({ userId, onFollow, onUnfollow }) => {
  const { me } = useSelector(state => state.user);

  return (!me
    ? <Button onClick={onFollow}>팔로우</Button>
    : me.Followings && (me.Followings.find(v => v.id === userId)
      ? <Button onClick={onUnfollow}>언팔로우</Button>
      : <Button onClick={onFollow}>팔로우</Button>
    )
  );
};

FollowButton.propTypes = {
  userId: PropTypes.string.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

export default FollowButton;
