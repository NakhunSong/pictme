import React from 'react';
import PropTypes from 'prop-types';

import {
  FullscreenWrapper,
} from './style';

const Fullscreen = ({ children }) => {
  return (
    <FullscreenWrapper>
      {children}
    </FullscreenWrapper>
  );
};

Fullscreen.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Fullscreen;
