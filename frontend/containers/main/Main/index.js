import React, { useEffect } from 'react';
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
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

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
