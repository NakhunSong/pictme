import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card, Avatar, message } from 'antd';
import PropTypes from 'prop-types';

import ProfilePosts from '../../../components/post/ProfilePosts';
import {
  Wrapper,
  ProfileHeader,
  UserPicture,
  UserInfo,
  Seperator,
  PostsWrapper,
  Posts,
} from './style';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../../reducers/user';
import FollowButton from '../../../components/user/FollowButton';

const User = ({ mainPosts, userInfo }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  return (
    <Wrapper>
      <Card
        actions={[
          <div>
            게시글
            <br />
            {userInfo.Posts}
          </div>,
          <Link href="/following">
            <a>
              <div>
                팔로잉
                <br />
                {userInfo.Followings}
              </div>
            </a>
          </Link>,
          <Link href="/follower">
            <a>
              <div>
                팔로워
                <br />
                {userInfo.Followers}
              </div>
            </a>
          </Link>,
        ]}
        extra={<FollowButton userId={userInfo.id} onFollow={handleClickFollow} onUnfollow={handleClickUnfollow} />}
      >
        <Card.Meta
          avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
          title={userInfo.nickname}
          description="한마디"
        />
      </Card>
      <Seperator />
      <PostsWrapper>
        <Posts>
          {mainPosts.map((v) => {
            return (
              <ProfilePosts postRow={v} />
            );
          })}
        </Posts>
      </PostsWrapper>
    </Wrapper>
  );
};

User.propTypes = {
  userInfo: PropTypes.object.isRequired,
  mainPosts: PropTypes.array.isRequired,
};

export default User;
