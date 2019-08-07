import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, message, Icon } from 'antd';

import {
  Wrapper,
  PostFormWrapper,
  TitleWrapper,
} from './style';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../../reducers/post';
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
  const handleRemovePreviewImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index,
    });
  }, []);
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
    message.success('등록이 완료되었습니다.');
  }, [text]);

  return (
    <Wrapper>
      <PostFormWrapper encType="multipart/form-data" onSubmit={handleSubmitForm}>
        <TitleWrapper>
          <div className="title">Post</div>
        </TitleWrapper>
        <div className="image">
          <div className="seperator">
            <div className="or">사진</div>
          </div>
          <div className="upload-image">
            <input type="file" multiple hidden ref={imageInput} onChange={handleChangeImages} />
            <div className="images-wrapper">
              {imagePaths.map((v, i) => (
                <div key={v} className="image-preview">
                  <img src={`${backUrl}/post_image/${v}`} style={{ width: '180px', height: '230px' }} alt={v} />
                  <div className="remove-image-button">
                    <Icon type="close" onClick={handleRemovePreviewImage(i)}>제거</Icon>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="upload-button">
            <Button type="primary" onClick={handleImageUpload}>업로드</Button>
          </div>
        </div>
        <div className="description">
          <div className="seperator">
            <div className="or">설명</div>
          </div>
          <Input.TextArea maxLength={500} placeholder="사진에 대한 한마디!" value={text} onChange={handleChangeText}/>
          {textError && <div style={{ color: 'red' }}>사진에 대한 설명을 입력해주세요!</div>}
        </div>
        <div className="submit-button">
          <Button htmlType="submit" type="primary" ref={buttonClick}>등록</Button>
        </div>
      </PostFormWrapper>
    </Wrapper>
  );
};

export default PostForm;
