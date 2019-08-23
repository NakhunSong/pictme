import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';

import PostCard from '../../post/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../../../reducers/post';
import PostButton from '../../../components/post/PostButton';
import {
  MainWrapper,
  CardWrapper,
} from './style';

const Main = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1].id,
      });
    }
  }, [mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts]);

  if (!mainPosts) {
    return (
      <div>로딩 중</div>
    );
  }
  return (
    <MainWrapper>
      <CardWrapper>
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
      </CardWrapper>
      <div className="posts">
        {mainPosts && mainPosts.map((p) => {
          return (
            <PostCard key={p.id} post={p} />
          );
        })}
      </div>
      <PostButton />
    </MainWrapper>
  );
};

export default Main;
