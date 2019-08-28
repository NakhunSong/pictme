import styled from 'styled-components';
import { Card } from 'antd';

export const MainWrapper = styled.main`
  width: 100%;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .posts {
    margin-top: 10px;
    width: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const CardWrapper = styled(Card)`
  max-width: 400px;
  width: 100%;
`;
