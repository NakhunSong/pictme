import React, { useCallback } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { backUrl } from '../../../config/config';
import {
  PostImagesWrapper,
  HeartCounter,
  CommentCounter,
  Img,
} from './style';

const PostImages = ({ post, images }) => {
  const handleClick = useCallback(() => {
    Router.push({
      pathname: '/singlepost',
      query: { id: post.id },
    }, `/singlepost/${post.id}`);
  }, []);
  return (
    <PostImagesWrapper onClick={handleClick}>
      <div className="cover">
        <HeartCounter>
          <Icon type="heart" theme="filled" />
          <span className="length">{post.Likers.length}</span>
        </HeartCounter>
        <CommentCounter>
          <Icon type="message" theme="filled" />
          <span className="length">{post.Comments.length}</span>
        </CommentCounter>
      </div>
      <Img src={images[0].src.replace(/original\//, 'thumbnail_small/')} width="100%" alt="" />
    </PostImagesWrapper>
  );
};

PostImages.propTypes = {
  post: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
