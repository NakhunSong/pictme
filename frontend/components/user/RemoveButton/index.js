import React from 'react';
import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import {
  RemoveButtonWrapper,
} from './style';

const RemoveButton = ({ onRemove, itemId }) => {
  return (
    <Popconfirm
      title="정말 삭제하시겠습니까?"
      onConfirm={onRemove(itemId)}
      okText="예"
      cancelText="아니오"
    >
      <RemoveButtonWrapper type="delete" />
    </Popconfirm>
  );
};

RemoveButton.propTypes = {
  onRemove: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
};

export default RemoveButton;
