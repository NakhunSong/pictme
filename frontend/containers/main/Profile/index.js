import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Card, Avatar, Button } from 'antd';

import {
  Wrapper,
  ProfileHeader,
  UserPicture,
  UserInfo,
  Seperator,
} from './style';

const Profile = () => {
  const { me } = useSelector(state => state.user);
  return (
    <Wrapper>
      <Card
        actions={[
          <Link href="/profile" key="post">
            <a>
              <div>게시글</div>
            </a>
          </Link>,
          <Link href="/profile" key="following">
            <a>
              <div>팔로잉</div>
            </a>
          </Link>,
          <Link href="/profile" key="follower">
            <a>
              <div>팔로워</div>
            </a>
          </Link>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
      </Card>
    </Wrapper>
  );
};

export default Profile;
