import React, { useCallback } from 'react';
import { Icon } from 'antd';
import Router from 'next/router';

import { ButtonWrapper } from './style';

const PostButton = () => {
  const handleClickButton = useCallback(() => {
    Router.push('/postup');
  }, []);
  return (
    <ButtonWrapper>
      <Icon type="edit" onClick={handleClickButton} />
    </ButtonWrapper>
  );
};

export default PostButton;
