import React from 'react';
import styled from 'styled-components';

const LoginTemplateWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

const LoginTemplate = ({children}) => {
  return (
    <LoginTemplateWrapper>
      {children}
    </LoginTemplateWrapper>
  );
};

export default LoginTemplate;