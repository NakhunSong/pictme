import React from 'react';
import PropTypes from 'prop-types';

import {
  RowWrapper,
  ColWrapper,
} from './style';

const ProfilePosts = ({ postRow }) => {
  return (
    <RowWrapper>
      <ColWrapper>{postRow[0].id}</ColWrapper>
      <ColWrapper>{postRow[1].id}</ColWrapper>
      <ColWrapper>{postRow[2].id}</ColWrapper>
    </RowWrapper>
  );
};

ProfilePosts.propTypes = {
  postRow: PropTypes.array.isRequired,
};

export default ProfilePosts;
