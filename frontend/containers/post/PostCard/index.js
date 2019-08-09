import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Avatar, message } from 'antd';
import PropTypes from 'prop-types';

import {
  PostCardWrapper,
  CardWrapper,
} from './style';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../../reducers/post';
import PostImages from '../../../components/post/PostImages';
import PostCardContent from '../../../components/post/PostCardContent';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.me && state.user.me.id);

  const liked = userId && post.Likers && post.Likers.find(v => v.id === userId);

  const onToggleLike = useCallback(() => {
    if (!userId) {
      return message.info('로그인이 필요한 작업입니다.');
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [userId, post && post.id, liked]);

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
          <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike} />,
          <Icon type="message" key="message" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
      >
        <Card.Meta
          description={<PostCardContent postContent={post.content} />}
        />
      </CardWrapper>
    </PostCardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.array,
    Likers: PropTypes.array,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
