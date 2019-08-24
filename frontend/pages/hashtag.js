import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import HashtagPostTemplate from '../components/post/HashtagPostTemplate';
import PostCard from '../containers/post/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const mainPosts = useSelector(state => state.post.mainPosts);
  const hasMorePost = useSelector(state => state.post.hasMorePost);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          data: tag,
          lastId: mainPosts[mainPosts.length - 1].id,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

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
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
