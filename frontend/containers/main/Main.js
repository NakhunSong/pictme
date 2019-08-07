import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';

import PostCard from '../post/PostCard';
import PostForm from '../post/PostFormModal';
import { LOAD_MAIN_POSTS_REQUEST } from '../../reducers/post';
import PostButton from '../../components/post/PostButton';

const MainWrapper = styled.main`
  width: 100%;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .posts {
    margin-top: 10px;
    width: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const CardWrapper = styled(Card)`
  max-width: 500px;
  width: 100%;
`;

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