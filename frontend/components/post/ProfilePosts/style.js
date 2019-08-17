import styled from 'styled-components';

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 0%;

  @media (max-width: 735px) {
    margin-bottom: 3px;
  }
  @media (min-width: 736px) {
    margin-bottom: 28px;
  }
`;
export const ColWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: black;
  color: white;

  @media (max-width: 735px) {
    margin-right: 3px;
  }
  @media (min-width: 736px) {
    &margin-right: 28px;
  }
  
`;
