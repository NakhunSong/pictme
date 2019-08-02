import React, { useCallback, useState } from 'react';
import { Icon, Modal, Input } from 'antd';

import { ButtonWrapper } from './style';

const PostForm = () => {
  const [visible, setVisible] = useState(false);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);
  const handleSubmit = useCallback(() => {
    console.log('제출');
  }, []);
  return (
    <ButtonWrapper>
      <Icon type="edit" onClick={showModal} />
      <Modal
        title="게시물 작성"
        visible={visible}
        okText="pictu"
        onOk={handleSubmit}
        cancelText="취소"
        onCancel={handleCancel}
      >
        <Input.TextArea placeholder="콘텐츠" />
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </ButtonWrapper>
  );
};

export default PostForm;
