import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 20px 20px 0;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #3897f0;
  color: white;
  font-size: 30px;
  text-align: center;

  &:hover {
    transition: all .2s;
    cursor: pointer;
    transform: scale(1.2, 1.2);
  }
`;

const PostButton = () => {
  return (
    <ButtonWrapper>
      <Icon type="edit" />
    </ButtonWrapper>
  );
};

export default PostButton;
