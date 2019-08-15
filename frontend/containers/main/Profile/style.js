import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-grow: 1;
  margin: 0 auto 30px;
  max-width: 935px;
  width: 100%;

  @media (min-width: 736px) {
    box-sizing: content-box;
    padding: 60px 20px 0;
    width: calc(100% - 40px);
  }
`;

export const ProfileHeader = styled.header`
  display: flex;
  flex-direction: row;
  
  @media (min-width: 736px) {
    margin-bottom: 44px;
  }
  @media (max-width: 735px) {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 30px;
  }
  margin-bottom: 24px;
  border-bottom: none;
  padding-bottom: 0;
`;

export const UserPicture = styled.div`
  height: 150px;
  width: 150px;

  @media (min-width: 736px) {
    flex-basis: 0;
    flex-grow: 1;
    margin-right: 30px;
  }
  @media (max-width: 735px) {
    margin-right: 28px;
    flex-shrink: 0;
  }
`;

export const UserInfo = styled.section`
  @media (min-width: 736px) {
    flex-grow: 2;
    flex-basis: 30px;
  }
`;

export const Seperator = styled.ul`
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
`;
