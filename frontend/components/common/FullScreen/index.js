import React from 'react';
import PropTypes from 'prop-types';

import {
  FullscreenWrapper,
} from './style';

const Fullscreen = ({ children, screenType, maxWidth }) => {
  return (
    <FullscreenWrapper screenType={screenType} maxWidth={maxWidth}>
      {children}
    </FullscreenWrapper>
  );
};

Fullscreen.propTypes = {
  children: PropTypes.array.isRequired,
  screenType: PropTypes.string.isRequired,
  maxWidth: PropTypes.string.isRequired,
};

export default Fullscreen;
