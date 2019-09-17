import React, { memo } from 'react';
import { Avatar } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

const ProfilePhoto = memo(({ userInfo }) => {
  return (
    <Link
      href={{ pathname: 'profile', query: { id: userInfo.id } }}
      as={`profile/${userInfo.id}`}
    >
      <a>
        <Avatar>
          {userInfo.nickname[0]}
        </Avatar>
      </a>
    </Link>
  );
});

ProfilePhoto.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default ProfilePhoto;

