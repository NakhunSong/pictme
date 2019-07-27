import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardWrapper = styled(Card)`
  max-width: 500px;
  width: 100%;
  max-height: 700px;
  height: 100%;
  margin-top: 20px;
`;

const PostCard = ({ post }) => {
  return (
    <CardWrapper
      key={+post.createdAt}
      cover={post.img && <img alt="example" src={post.img} />}
      actions={[
        <Icon type="retweet" key="retweet" />,
        <Icon type="heart" key="heart" />,
        <Icon type="message" key="message" />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
      // extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={post.User.profileImg ? <Avatar size="large" src={`${post.User.profileImg}`} /> : <Avatar size="large">{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname}
        description={post.content}
      />
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
