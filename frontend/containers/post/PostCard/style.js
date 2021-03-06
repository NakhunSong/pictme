import styled from 'styled-components';
import { Card } from 'antd';

export const PostCardWrapper = styled.div`
  margin-bottom: 25px;
  max-width: 400px;
  width: 100%;
  max-height: 650px;
`;

export const CardWrapper = styled(Card)`
  // height: 100%;
`;

export const InlineBlock = styled.div`
  display: inline-block;
  & + & {
    margin-left: 4px;
  }
`;
