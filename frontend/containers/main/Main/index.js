import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';

import PostCard from '../../post/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../../../reducers/post';
import PostButton from '../../../components/post/PostButton';
import Loading from '../../../components/common/Loading';
import {
  MainWrapper,
  CardWrapper,
} from './style';

const Main = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const mainPosts = useSelector(state => state.post.mainPosts);
  const hasMorePost = useSelector(state => state.post.hasMorePost);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  if (!mainPosts) {
    return (
      <Loading />
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
