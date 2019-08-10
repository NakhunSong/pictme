import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, List, Comment } from 'antd';

import { UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST } from '../../../reducers/post';
import { backUrl } from '../../../config/config';
import PostCardContent from '../../../components/post/PostCardContent';

import {
  SinglePostWrapper,
  IconWrapper,
} from './style';
import CommentForm from '../CommentForm';

const SinglePostCard = ({ singlePost }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.me && state.user.me.id);

  const [commentFormOpended, setCommentFormOpended] = useState(false);
  const imageSrc = singlePost && singlePost.Images && singlePost.Images[0] && singlePost.Images[0].src;
  const liked = singlePost && singlePost.Likers && singlePost.Likers.find(v => v.id === userId);

  const handleToggleLike = useCallback(() => {
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: singlePost.id,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: singlePost.id,
      });
    }
  }, [singlePost && singlePost.id, liked]);

  const handleToggleComment = useCallback(() => {
    setCommentFormOpended(prev => !prev);
    if (!commentFormOpended) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: singlePost.id,
      });
    }
  }, []);

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
        <IconWrapper type="message" key="message" style={{ fontSize: '30px' }} onClick={handleToggleComment} />
        <div className="like-counter">좋아요 {singlePost.Likers.length}개</div>
      </div>
      {commentFormOpended && (
        <div>
          <CommentForm post={singlePost} />
          <List
            header={`댓글 ${singlePost.Comments ? singlePost.Comments.length : 0}개`}
            itemLayout="horizontal"
            dataSource={singlePost.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </SinglePostWrapper>
  );
};

SinglePostCard.propTypes = {
  singlePost: PropTypes.object.isRequired,
};

export default SinglePostCard;
