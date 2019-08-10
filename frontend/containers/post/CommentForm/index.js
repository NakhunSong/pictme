import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../../../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitComment = useCallback((e) => {
    e.preventDefault(); // form은 무조건 이것을 해줘야 새로고침 방지 가능.
    if (!me) {
      return message.error('로그인이 필요한 접근입니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
  }, [me && me.id, commentText]);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onSubmit={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          placeholder="댓글을 남겨보세요."
          style={{ resize: 'none', height: '80px' }}
          value={commentText}
          onChange={onChangeCommentText}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment}>작성</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
