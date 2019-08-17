import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Card, Avatar, Col, Row } from 'antd';

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

const Profile = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <Wrapper>
      <Card
        actions={[
          <div>
            게시글
            <br />
            {me.Posts.length}
          </div>,
          <Link href="/following">
            <a>
              <div>
                팔로잉
                <br />
                {me.Followings.length}
              </div>
            </a>
          </Link>,
          <Link href="/follower">
            <a>
              <div>
                팔로워
                <br />
                {me.Followers.length}
              </div>
            </a>
          </Link>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
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

export default Profile;
