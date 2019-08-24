import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Avatar, Button } from 'antd';
import Proptypes from 'prop-types';

import FollowButton from '../../../components/user/FollowButton';
import {
  FollowListWrapper,
} from './style';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST } from '../../../reducers/user';

const FollowList = ({ title, followList, userInfo }) => {
  const dispatch = useDispatch();
  const { hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
  const hasMoreFollow = title === '팔로잉' ? hasMoreFollowing : hasMoreFollower;

  const handleLoadMoreClick = useCallback(() => {
    dispatch({
      type: title === '팔로잉' ? LOAD_FOLLOWINGS_REQUEST : LOAD_FOLLOWERS_REQUEST,
      data: userInfo.id,
      lastId: followList && followList[followList.length - 1].id,
    });
  }, [followList && followList.length]);

  return (
    <FollowListWrapper>
      <List
        header={`${userInfo.nickname}님의 ${title} 목록`}
        bordered
        itemLayout="horizontal"
        dataSource={followList || []}
        loadMore={hasMoreFollow && <Button onClick={handleLoadMoreClick} style={{ width: '100%' }}>more</Button>}
        renderItem={item => (
          <List.Item
            extra={<FollowButton />}
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
  title: Proptypes.string.isRequired,
  followList: Proptypes.array.isRequired,
  userInfo: Proptypes.object.isRequired,
};

export default FollowList;
