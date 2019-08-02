import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Modal, Input, Button } from 'antd';

import { ButtonWrapper } from './style';
import { ADD_POST_REQUEST } from '../../../reducers/post';
import { backUrl } from '../../../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [visible, setVisible] = useState(false);
  const imageInput = useRef();

  useEffect(() => {
    setText('');
  }, [postAdded === true]); // 게시물 작성 완료 후 input 초기화

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);
  const handleCancel = useCallback(() => {
    setText('');
    setVisible(false);
  }, []);
  const handleImageUpload = useCallback(() => {
    imageInput.current.click(); // ref 가리키는 곳 클릭.
  }, [imageInput.current]);
  const handleChangeText = useCallback((e) => {
    setTextError(false);
    setText(e.target.value);
  }, []);
  const handleSubmit = () => {
    if (!text || !text.trim()) {
      return setTextError(true);
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text.trim(),
      },
    });
    setVisible(false);
  };

  return (
    <ButtonWrapper>
      <Icon type="edit" onClick={showModal} />
      <Modal
        title="게시물 작성"
        visible={visible}
        maskClosable={false}
        closable={false}
        okText="작성"
        onOk={handleSubmit}
        confirmLoading={isAddingPost}
        cancelText="취소"
        onCancel={handleCancel}
      >
        <div>
          <div style={{ fontSize: '14px', borderBottom: '1px solid #e6e6e6', marginBottom: '2px', paddingBottom: '2px' }}>
            사진
          </div>
          <div>
            <input type="file" multiple hidden ref={imageInput} />
            <Button onClick={handleImageUpload}>업로드</Button>
          </div>
          <div>
            {imagePaths.map(v => (
              <div>
                <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div>
          <div style={{ fontSize: '14px', borderBottom: '1px solid #e6e6e6', marginBottom: '2px', paddingBottom: '2px' }}>
            설명
          </div>
          <Input.TextArea maxLength={140} placeholder="사진에 대한 한마디!" value={text} onChange={handleChangeText}/>
          {textError && <div style={{ color: 'red' }}>사진에 대한 설명을 입력해주세요!</div>}
        </div>
      </Modal>
    </ButtonWrapper>
  );
};

export default PostForm;
