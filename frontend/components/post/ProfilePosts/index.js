import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ProfilePostImage from '../ProfilePostImage';
import {
  RowWrapper,
  ColWrapper,
} from './style';

const ProfilePosts = memo(({ postRow }) => {
  return (
    <RowWrapper>
      <ColWrapper>
        {postRow[0].Images && <ProfilePostImage images={postRow[0].Images} />}
      </ColWrapper>
      <ColWrapper>
        {postRow[1] ? <ProfilePostImage images={postRow[1].Images} /> : <div>blank</div> }
      </ColWrapper>
      <ColWrapper>
        {postRow[2] ? <ProfilePostImage images={postRow[2].Images} /> : <div>blank</div>}
      </ColWrapper>
    </RowWrapper>
  );
});

ProfilePosts.propTypes = {
  postRow: PropTypes.array.isRequired,
};

export default ProfilePosts;
