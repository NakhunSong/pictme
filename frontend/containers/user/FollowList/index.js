import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Avatar, Button, message } from 'antd';
import PropTypes from 'prop-types';

import FollowButton from '../FollowButton';
import {
  FollowListWrapper,
} from './style';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../../../reducers/user';
import RemoveButton from '../../../components/user/RemoveButton';

const FollowList = ({ title, mode, followList, userInfo }) => {
  const dispatch = useDispatch();
  const { hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
  const hasMoreFollow = title === '팔로잉' ? hasMoreFollowing : hasMoreFollower;
  const meId = useSelector(state => state.user.me && state.user.me.id);

  const handleLoadMoreClick = useCallback(() => {
    dispatch({
      type: mode === 'FOLLOWING' ? LOAD_FOLLOWINGS_REQUEST : LOAD_FOLLOWERS_REQUEST,
      data: userInfo.id,
      lastId: followList && followList[followList.length - 1].id,
    });
  }, [followList && followList.length]);

  const handleRemoveFollow = useCallback(userId => () => {
    if (!meId) {
      return message.error('로그인이 필요한 작업입니다.');
    }
    if (mode === 'FOLLOWING') {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
        me: meId,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      });
    }
  }, [meId]);

  return (
    <FollowListWrapper>
      <List
        header={`${meId === userInfo.id? '내' : `${userInfo.nickname}님의`} ${title} 목록`}
        bordered
        itemLayout="horizontal"
        dataSource={followList || []}
        loadMore={hasMoreFollow && <Button onClick={handleLoadMoreClick} style={{ width: '100%' }}>more</Button>}
        renderItem={item => (
          <List.Item
            extra={(meId === userInfo.id
              ? <RemoveButton onRemove={handleRemoveFollow} itemId={item.id} />
              : <FollowButton mode={mode} userId={item.id} />
            )}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.nickname[0]}</Avatar>}
              title={<div>{item.nickname}</div>}
            />
          </List.Item>
        )}
      />
    </FollowListWrapper>
  );
};

FollowList.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  followList: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default FollowList;
