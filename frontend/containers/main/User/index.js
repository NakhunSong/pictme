import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Card, Avatar, Col, Row } from 'antd';
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

const User = ({ mainPosts, userInfo }) => {
  // const { me } = useSelector(state => state.user);
  // const { mainPosts } = useSelector(state => state.post);

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
