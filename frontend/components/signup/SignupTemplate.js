import React from 'react';
import styled from 'styled-components';

const SignupTemplateWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

const SignupTemplate = ({children}) => {
  return (
    <SignupTemplateWrapper>
      {children}
    </SignupTemplateWrapper>
  );
};

export default SignupTemplate;