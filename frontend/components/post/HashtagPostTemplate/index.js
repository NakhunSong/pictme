import React from 'react';
import PropTypes from 'prop-types';

import {
  HashtagPostWrapper,
} from './style';

const HashtagPostTemplate = ({ children }) => {
  return (
    <HashtagPostWrapper>
      {children}
    </HashtagPostWrapper>
  );
};

HashtagPostTemplate.propTypes = {
  children: PropTypes.object.isRequired,
};

export default HashtagPostTemplate;
