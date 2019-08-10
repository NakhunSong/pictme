import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Avatar } from 'antd';

import { LOAD_SINGLE_POST_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST } from '../reducers/post';
import { backUrl } from '../config/config';
import PostCardContent from '../components/post/PostCardContent';

const SinglePostWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-style: hidden solid solid solid;

  .profile {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    display: flex;
    align-items: center;

    .nickname {
      display: 'inline-block';
      margin-left: 5px;
    }
  }
  .image {
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    text-align: center;
    overflow: hidden;

    img {

      max-width: 100%;
      width: auto;
      height: 350px;
    }
  }

  .content {
    padding: 15px;
  }
  .interest {
    width: 100%;
    padding: 0 15px 15px 15px;
    & ~ & {
      margin-right: 5px;
    }

    .like-counter {
      margin-top: 10px;
    }
    
  }
`;
const IconWrapper = styled(Icon)`
  & + & {
    margin-left: 10px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const SinglePost = ({ id }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.me && state.user.me.id);
  const { singlePost } = useSelector(state => state.post);

  const imageSrc = singlePost && singlePost.Images && singlePost.Images[0] && singlePost.Images[0].src;
  const liked = singlePost && singlePost.Likers && singlePost.Likers.find(v => v.id === userId);

  useEffect(() => {
    dispatch({
      type: LOAD_SINGLE_POST_REQUEST,
      data: id,
    });
  }, []);

  const handleToggleLike = useCallback(() => {
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: id,
      });
    }
  }, [id, liked]);

  console.log('singlepost: ', singlePost);
  if (!singlePost) {
    return (
      <div>로딩중</div>
    );
  }
  return (
    <SinglePostWrapper>
      <div className="profile">
        <Avatar>{singlePost.User.nickname[0]}</Avatar>
        <div className="nickname">{singlePost.User.nickname}</div>
      </div>
      <div className="image">
        {imageSrc
          ? <img src={`${backUrl}/post_image/${imageSrc}`} alt="" />
          : <img src={`${backUrl}/post_image/white1565422049140.png`} alt="" />
        }
      </div>
      <div className="content">
        <PostCardContent postContent={singlePost.content} />
      </div>
      <div className="interest">
        <IconWrapper type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" style={{ fontSize: '30px' }} onClick={handleToggleLike} />
        <IconWrapper type="message" key="message" style={{ fontSize: '30px' }} />
        <div className="like-counter">좋아요 {singlePost.Likers.length}개</div>
      </div>
    </SinglePostWrapper>
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
