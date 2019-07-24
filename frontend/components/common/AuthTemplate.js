import React from 'react';
import styled from 'styled-components';

const AuthTemplateWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

const AuthTemplate = ({children}) => {
  return (
    <AuthTemplateWrapper>
      {children}
    </AuthTemplateWrapper>
  );
};

export default AuthTemplate;