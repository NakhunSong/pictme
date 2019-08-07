import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

const MainTemplateWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const MainTemplate = ({ children }) => {
  return (
    <MainTemplateWrapper>
      {children}
    </MainTemplateWrapper>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MainTemplate;
