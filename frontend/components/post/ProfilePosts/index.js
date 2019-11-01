import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ProfilePostImage from '../ProfilePostImage';
import {
  RowWrapper,
  ColWrapper,
} from './style';

const ProfilePosts = memo(({ postRow }) => {
  console.log(postRow);
  return (
    <RowWrapper>
      <ColWrapper>
        {postRow[0] && <ProfilePostImage key={postRow[0].id} post={postRow[0]} images={postRow[0].Images} />}
      </ColWrapper>
      <ColWrapper>
        {postRow[1] ? <ProfilePostImage key={postRow[1].id} post={postRow[1]} images={postRow[1].Images} /> : <div>not image</div> }
      </ColWrapper>
      <ColWrapper>
        {postRow[2] ? <ProfilePostImage key={postRow[2].id} post={postRow[2]} images={postRow[2].Images} /> : <div>not image</div>}
      </ColWrapper>
    </RowWrapper>
  );
});

ProfilePosts.propTypes = {
  postRow: PropTypes.array.isRequired,
};

export default ProfilePosts;
