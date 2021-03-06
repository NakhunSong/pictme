import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Avatar, List, Comment, message } from 'antd';
import Router from 'next/router';

import { UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST } from '../../../reducers/post';
import { backUrl } from '../../../config/config';
import PostCardContent from '../../../components/post/PostCardContent';

import {
  SinglePostWrapper,
  IconWrapper,
  LikeCounter,
} from './style';
import CommentForm from '../CommentForm';
import ProfilePhoto from '../../../components/user/ProfilePhoto/UserInfo';

const SinglePostCard = ({ singlePost }) => {
  const dispatch = useDispatch();
  const [commentFormOpended, setCommentFormOpended] = useState(false);

  const imageSrc = singlePost && singlePost.Images && singlePost.Images[0] && singlePost.Images[0].src;
  const meId = useSelector(state => state.user.me && state.user.me.id);
  const userId = singlePost && singlePost.User && singlePost.User.id;
  const liked = meId && singlePost.Likers && singlePost.Likers.find(v => v.id === meId);

  const handleToggleLike = useCallback(() => {
    if (!meId) {
      return message.info('로그인이 필요한 작업입니다.');
    }
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
  }, [meId, singlePost && singlePost.id, liked]);

  const handleToggleComment = useCallback(() => {
    setCommentFormOpended(prev => !prev);
    if (!commentFormOpended) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: singlePost.id,
      });
    }
  }, []);

  const handleClickProfile = useCallback(() => {
    if (userId === meId) {
      return Router.push('/profile');
    }
    Router.push({
      pathname: '/user',
      query: { id: userId },
    }, `/user/${userId}`);
  }, [userId]);

  return (
    <SinglePostWrapper>
      <div className="profile" onClick={handleClickProfile}>
        <ProfilePhoto userInfo={singlePost.User} />
        <div className="nickname">{singlePost.User.nickname}</div>
      </div>
      <div className="image">
        {imageSrc
          ? <img src={imageSrc} alt="" />
          : <img src={`${backUrl}/post_image/white1565422049140.png`} alt="" />
        }
      </div>
      <div className="content">
        <PostCardContent postContent={singlePost.content} />
      </div>
      <div className="interest">
        <IconWrapper type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" style={{ fontSize: '30px' }} onClick={handleToggleLike} />
        <IconWrapper type="message" key="message" style={{ fontSize: '30px' }} onClick={handleToggleComment} />
        <div className="like-counter">
          {singlePost && singlePost.Likers.length > 0
            ? (
              <Link
                href={{ pathname: '/liker', query: { id: singlePost.id } }}
                as={`/liker/${singlePost.id}`}
              >
                <a><LikeCounter active="true">좋아요 {singlePost.Likers.length}개</LikeCounter></a>
              </Link>
            )
            : <LikeCounter>좋아요 {singlePost.Likers.length}개</LikeCounter>
            }
        </div>
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
                  content={item.content}
                  author={item.User && item.User.nickname}
                  avatar={item.User && <ProfilePhoto userInfo={item.User} />}
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
