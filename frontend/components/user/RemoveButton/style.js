import styled from 'styled-components';
import { Icon } from 'antd';

export const RemoveButtonWrapper = styled(Icon)`
  font-size: 25px;
  &:hover {
    cursor: pointer;
    transition: all .2s;
    transform: scale(1.2, 1.2);
    color: #3897F0;
  }
`;
