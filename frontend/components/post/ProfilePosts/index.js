import React from 'react';
import PropTypes from 'prop-types';

import ProfilePostImage from '../ProfilePostImage';
import {
  RowWrapper,
  ColWrapper,
} from './style';

const ProfilePosts = ({ postRow }) => {
  return (
    <RowWrapper>
      <ColWrapper>
        {postRow[0].Images && <ProfilePostImage images={postRow[0].Images} />}
      </ColWrapper>
      <ColWrapper>
        {postRow[1].Images && <ProfilePostImage images={postRow[1].Images} />}
      </ColWrapper>
      <ColWrapper>
        {postRow[2].Images && <ProfilePostImage images={postRow[2].Images} />}
      </ColWrapper>
    </RowWrapper>
  );
};

ProfilePosts.propTypes = {
  postRow: PropTypes.array.isRequired,
};

export default ProfilePosts;
