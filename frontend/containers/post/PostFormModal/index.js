import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Modal, Input, Button } from 'antd';

import { ButtonWrapper } from './style';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../../reducers/post';
import { backUrl } from '../../../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [visible, setVisible] = useState(false);
  const imageInput = useRef();
  const buttonClick = useRef();

  useEffect(() => {
    setText(''); // 게시물 작성 완료 후 input 초기화
    setVisible(false); // 게시물 작성 완료 후 모달 종료
  }, [postAdded === true]);

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
  const handleChangeImages = useCallback((e) => {
    console.log('e.target.files: ', e.target.files);
    const imageFormData = new FormData();
    Array.prototype.forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const handleOk = useCallback(() => {
    buttonClick.current.click();
  }, [buttonClick.current]);

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      return setTextError(true);
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text.trim(),
      },
    });
  }, [text]);

  return (
    <ButtonWrapper>
      <Icon type="edit" onClick={showModal} />
      <Modal
        title="게시물 작성"
        visible={visible}
        maskClosable={false}
        closable={false}
        okText="작성"
        onOk={handleSubmitForm}
        confirmLoading={isAddingPost}
        cancelText="취소"
        onCancel={handleCancel}
      >
        <form encType="multipart/form-data" onSubmit={handleSubmitForm}>
          <div>
            <div style={{ fontSize: '14px', borderBottom: '1px solid #e6e6e6', marginBottom: '2px', paddingBottom: '2px' }}>
              사진
            </div>
            <div>
              <input type="file" multiple hidden ref={imageInput} onChange={handleChangeImages} />
              <Button onClick={handleImageUpload}>업로드</Button>
            </div>
            <div>
              {imagePaths.map(v => (
                <div key={v} style={{ display: 'inline-block' }}>
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
          <div>
            <button style={{ display: 'none' }} type="submit" ref={buttonClick}>등록</button>
          </div>
        </form>
      </Modal>
    </ButtonWrapper>
  );
};

export default PostForm;
