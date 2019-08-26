import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import HashtagPostTemplate from '../components/post/HashtagPostTemplate';
import PostCard from '../containers/post/PostCard';
import Loading from '../components/common/Loading';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const mainPosts = useSelector(state => state.post.mainPosts);
  const hasMorePost = useSelector(state => state.post.hasMorePost);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  if (!mainPosts) {
    return (
      <Loading />
    );
  }
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
