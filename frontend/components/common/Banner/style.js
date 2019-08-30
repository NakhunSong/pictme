import styled from 'styled-components';

export const BannerWrapper = styled.div`
  @media (max-width: 875px) {
    display: none;
  }
  align-self: center;
  background-size: 520px 620px;
  height: 618px;
  flex-basis: 520px;
  background-image: url('../../../static/images/homepage/iphones.png');
`;