import styled from 'styled-components';
import { Icon } from 'antd';

export const SinglePostWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-style: hidden solid solid solid;

  .profile {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    display: flex;
    align-items: center;

    .nickname {
      display: 'inline-block';
      margin-left: 5px;
    }
  }
  .image {
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    text-align: center;
    overflow: hidden;

    img {

      max-width: 100%;
      width: auto;
      height: 350px;
    }
  }

  .content {
    padding: 15px;
  }
  .interest {
    width: 100%;
    padding: 0 15px 15px 15px;
    & ~ & {
      margin-right: 5px;
    }
    
  }
`;
export const IconWrapper = styled(Icon)`
  & + & {
    margin-left: 10px;
  }
`;