import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card, Avatar, message } from 'antd';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Seperator,
  PostsWrapper,
  Posts,
} from './style';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../../reducers/user';
import ProfilePosts from '../../../components/post/ProfilePosts';
import FollowButton from '../FollowButton';
import ProfileEditButton from '../../../components/user/ProfileEditButton';
import { LOAD_USER_POSTS_REQUEST } from '../../../reducers/post';

const Profile = ({ mode, mainPosts, userInfo }) => {
  const { me } = useSelector(state => state.user);
  const hasMorePost = useSelector(state => state.post.hasMorePost);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const handleClickFollow = useCallback(() => {
    if (!me) {
      return message.error('로그인이 필요합니다..');
    }
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: userInfo.id,
    });
  }, [userInfo && userInfo.id]);
  const handleClickUnfollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userInfo.id,
    });
  }, [userInfo && userInfo.id]);

  const handleScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 50) {
      if (hasMorePost) {
        const mainPostsLastRow = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1];
        const lastId = mainPostsLastRow[mainPostsLastRow.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: userInfo.id,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mainPosts.length]);
  return (
    <Wrapper>
      <Card
        actions={[
          <div>
            게시글
            <br />
            {userInfo.Posts.length}
          </div>,
          <Link href={{ pathname: '/following', query: { id: userInfo.id } }} as={`/following/${userInfo.id}`}>
            <a>
              <div>
                팔로잉
                <br />
                {userInfo.Followings.length}
              </div>
            </a>
          </Link>,
          <Link href={{ pathname: '/follower', query: { id: userInfo.id } }} as={`/follower/${userInfo.id}`}>
            <a>
              <div>
                팔로워
                <br />
                {userInfo.Followers.length}
              </div>
            </a>
          </Link>,
        ]}
        // mode === 'meProfile'
        extra={userInfo.id === me && me.id
          ? <ProfileEditButton />
          : <FollowButton userInfo={userInfo} userId={userInfo.id} onFollow={handleClickFollow} onUnfollow={handleClickUnfollow} />
        }
      >
        <Card.Meta
          avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
          title={userInfo.nickname}
          description=""
        />
      </Card>
      <Seperator />
      <PostsWrapper>
        <Posts>
          {mainPosts.map((v, i) => {
            return (
              <ProfilePosts key={i} postRow={v} />
            );
          })}
        </Posts>
      </PostsWrapper>
    </Wrapper>
  );
};

Profile.propTypes = {
  mode: PropTypes.string,
  userInfo: PropTypes.object.isRequired,
  mainPosts: PropTypes.array.isRequired,
};

export default Profile;
