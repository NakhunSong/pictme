import styled from 'styled-components';
import { Icon } from 'antd';

export const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingIcon = styled(Icon)`
  font-size: 5rem;
  color: #3897F0;
`;
