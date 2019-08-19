import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Avatar } from 'antd';

import { LOAD_SINGLE_POST_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST } from '../reducers/post';
import SinglePostCard from '../containers/post/SinglePostCard';

const SinglePost = ({ id }) => {
  const dispatch = useDispatch();
  const { singlePost } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_SINGLE_POST_REQUEST,
      data: id,
    });
  }, [id]);

  if (!singlePost) {
    return (
      <div>로딩중</div>
    );
  }
  return (
    <SinglePostCard singlePost={singlePost} />
  );
};

SinglePost.propTypes = {
  id: PropTypes.string.isRequired,
};

SinglePost.getInitialProps = async (context) => {
  const { id } = context.query;
  console.log('singlepost context: ', context.query.id);
  return { id };
};

export default SinglePost;
