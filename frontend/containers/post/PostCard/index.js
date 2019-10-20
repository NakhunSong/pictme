import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Avatar, message, Popover, Button } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  PostCardWrapper,
  CardWrapper,
  InlineBlock,
} from './style';
import { REMOVE_POST_REQUEST } from '../../../reducers/post';
import PostImages from '../../../components/post/PostImages';
import PostCardContent from '../../../components/post/PostCardContent';
import RemoveButton from '../../../components/user/RemoveButton';

const PostCard = memo(({ post }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.me && state.user.me.id);

  const liked = userId && post.Likers && post.Likers.find(v => v.id === userId);

  const handleClickCard = useCallback((e) => {
    e.stopPropagation();
    Router.push({
      pathname: '/singlepost',
      query: { id: post.id },
    }, `singlepost/${post.id}`);
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
    <PostCardWrapper
      onClick={handleClickCard}
    >
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
          <div>
            <InlineBlock>
              <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" />
            </InlineBlock>
            <InlineBlock>
              {post.Likers && post.Likers.length}
              개
            </InlineBlock>
          </div>,
          <div>
            <InlineBlock>
              <Icon type="message" key="message" />
            </InlineBlock>
            <InlineBlock>
              {post.Comments && post.Comments.length}
              개
            </InlineBlock>
          </div>,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {userId && post.UserId === userId
                  ? (
                    <>
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
});

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    UserId: PropTypes.number.isRequired,
    User: PropTypes.object,
    Images: PropTypes.array,
    Likers: PropTypes.array,
    Comments: PropTypes.array,
  }).isRequired,
};

export default PostCard;
