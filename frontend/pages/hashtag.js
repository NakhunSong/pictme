import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import HashtagPostTemplate from '../components/post/HashtagPostTemplate';
import PostCard from '../containers/post/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);

  return (
    <HashtagPostTemplate>
      {mainPosts.map((v) => {
        return (
          <PostCard key={v.id} post={v} />
        );
      })}
    </HashtagPostTemplate>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
  const { tag } = context.query;

  return { tag };
};

export default Hashtag;
