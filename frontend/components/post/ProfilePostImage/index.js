import React from 'react';
import Proptypes from 'prop-types';

import { backUrl } from '../../../config/config';
import {
  Img,
} from './style';

const PostImages = ({ images }) => {
  return (
    <div>
      <Img src={images[0].src} width="100%" alt="" />
    </div>
  );
};

PostImages.propTypes = {
  images: Proptypes.arrayOf(Proptypes.shape({
    src: Proptypes.string,
  })).isRequired,
};

export default PostImages;
