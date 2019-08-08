import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';

import {
  PostCardWrapper,
  CardWrapper,
} from './style';
import PostImages from '../../../components/post/PostImages';

const PostCard = ({ post }) => {
  return (
    <PostCardWrapper>
      <CardWrapper
        title={(
          <Card.Meta
            avatar={post.User.profileImg ? <Avatar size="large" src={`${post.User.profileImg}`} /> : <Avatar size="large">{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
          />
        )}
        hoverable
        key={+post.createdAt}
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
      >
        <Card.Meta
          description={post.content}
        />
      </CardWrapper>
    </PostCardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
