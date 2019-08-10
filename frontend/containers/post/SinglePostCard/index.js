import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Avatar } from 'antd';

import { LOAD_SINGLE_POST_REQUEST } from '../../../reducers/post';
import { backUrl } from '../../../config/config';
import PostCardContent from '../../../components/post/PostCardContent';
import {
  SinglePostWrapper,
  IconWrapper,
} from './style';

const SinglePost = ({ id }) => {
  const dispatch = useDispatch();
  const { singlePost } = useSelector(state => state.post);

  const imageSrc = singlePost && singlePost.Images && singlePost.Images[0] && singlePost.Images[0].src;

  useEffect(() => {
    dispatch({
      type: LOAD_SINGLE_POST_REQUEST,
      data: id,
    });
  }, []);

  console.log('singlepost: ', singlePost);
  return (
    <SinglePostWrapper>
      <div className="profile">
        <Avatar>{singlePost.User.nickname[0]}</Avatar>
        <div className="nickname">{singlePost.User.nickname}</div>
      </div>
      <div className="image">
        {imageSrc ? <img src={`${backUrl}/post_image/${imageSrc}`} alt="" />
          : <img src={`${backUrl}/post_image/white1565422049140.png`} alt="" />
        }
      </div>
      <div className="content">
        <PostCardContent postContent={singlePost.content} />
      </div>
      <div className="interest">
        <IconWrapper type="heart" key="heart" style={{ fontSize: '30px' }} />
        <IconWrapper type="message" key="message" style={{ fontSize: '30px' }} />
      </div>
    </SinglePostWrapper>
  );
};

SinglePost.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SinglePost;
