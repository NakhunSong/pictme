import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Avatar, message, Popover, Button } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  PostCardWrapper,
  CardWrapper,
} from './style';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST } from '../../../reducers/post';
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
  const handleClickCard = useCallback((e) => {
    e.stopPropagation();
    Router.push({
      pathname: '/singlepost',
      query: { id: post.id },
    });
  }, [post && post.id]);
  const handleRemovePost = useCallback(postId => (e) => {
    e.stopPropagation();
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: postId,
    });
    message.success('성공적으로 삭제되었습니다.');
  }, []);

  return (
    <PostCardWrapper>
      <CardWrapper
        onClick={handleClickCard}
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
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {userId && post.UserId === userId
                  ? (
                    <>
                      <Button type="default">수정</Button>
                      <Button type="danger" onClick={handleRemovePost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>
                }
              </Button.Group>
            )}
          >
            <Icon type="ellipsis" key="ellipsis" />
          </Popover>,
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
    content: PropTypes.string,
    createdAt: PropTypes.string,
    UserId: PropTypes.number.isRequired,
    User: PropTypes.object,
    Images: PropTypes.array,
    Likers: PropTypes.array,
  }).isRequired,
};

export default PostCard;
