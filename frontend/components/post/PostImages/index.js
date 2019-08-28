import React from 'react';
import Proptypes from 'prop-types';
import { Icon } from 'antd';

import { backUrl } from '../../../config/config';
import {
  More,
} from './style';

const PostImages = ({ images }) => {

  if (images.length === 1) { // 이미지 1개
    return (
      <div>
        <img src={images[0].src.replace(/original\//, 'thumbnail_big/')} alt="" width="100%" />
      </div>
    );
  }
  if (images.length === 2) { // 이미지 2개
    return (
      <div>
        <img src={images[0].src.replace(/original\//, 'thumbnail_big/')} width="50%" alt="" />
        <img src={images[1].src.replace(/original\//, 'thumbnail_big/')} width="50%" alt="" />
      </div>
    );
  }
  return (
    <div>
      <img src={images[0].src.replace(/original\//, 'thumbnail_big/')} width="50%" alt="" />
      <More>
        <Icon type="plus" />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </More>
    </div>
  );
};

PostImages.propTypes = {
  images: Proptypes.arrayOf(Proptypes.shape({
    src: Proptypes.string,
  })).isRequired,
};

export default PostImages;
