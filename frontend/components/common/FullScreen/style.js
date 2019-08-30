import styled from 'styled-components';

export const FullscreenWrapper = styled.div`
  height: 100%;
  max-width: ${props => props.maxWidth || "100%"};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.screenType || "column"};
  justify-content: center;
  align-items: center;
`;
