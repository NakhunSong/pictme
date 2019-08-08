import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthTemplateWrapper = styled.div`
  height: 100%;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateWrapper>
      {children}
    </AuthTemplateWrapper>
  );
};

AuthTemplate.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AuthTemplate;
