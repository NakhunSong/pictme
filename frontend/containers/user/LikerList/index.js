import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

import {
  LikerListWrapper,
} from './style';
import FollowButton from '../FollowButton';

const LikerList = ({ singlePost }) => {
  return (
    <LikerListWrapper>
      <List
        header="좋아요 목록"
        bordered
        itemLayout="horizontal"
        dataSource={singlePost.Likers || []}
        renderItem={item => (
          <List.Item
            extra={<FollowButton userId={item.id} />}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.nickname[0]}</Avatar>}
              title={<div>{item.nickname}</div>}
            />
          </List.Item>
        )}
      />
    </LikerListWrapper>
  );
};

LikerList.propTypes = {
  singlePost: PropTypes.object.isRequired,
};

export default LikerList;
