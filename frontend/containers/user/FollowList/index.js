import React from 'react';
import { List, Avatar } from 'antd';
import Proptypes from 'prop-types';

import FollowButton from '../../../components/user/FollowButton';
import {
  FollowListWrapper,
} from './style';

const FollowList = ({ title, followingList, userInfo }) => {

  return (
    <FollowListWrapper>
      <List
        header={`${userInfo.nickname}님의 ${title} 목록`}
        bordered
        itemLayout="horizontal"
        dataSource={followingList || []}
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
  followingList: Proptypes.array.isRequired,
  userInfo: Proptypes.object.isRequired,
};

export default FollowList;
