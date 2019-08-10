import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  PostCardContentWrapper,
} from './style';

const PostCardContent = ({ postContent }) => {
  return (
    <PostCardContentWrapper>
      {postContent.split(/(#[^\s]+)/g).map((v) => {
        if (v.match(/#[^\s]+/)) {
          return (
            <Link
              key={v}
              href={`/hashtag/?tag=${v.slice(1)}`}
              as={`/hashtag/${v.slice(1)}`}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </PostCardContentWrapper>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
