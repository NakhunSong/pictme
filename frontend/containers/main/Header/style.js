import styled from 'styled-components';

export const Menu = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  border: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    display: inline-block;
  }

  .logo {
    a {
      color: rgba(0, 0, 0, 0.70);
      font-weight: 600;
      &:hover {
        color: #3897F0;
      }
    }
    font-size: 35px;
    transition: all .2s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2, 1.2);
    }
  }

  .searchBox {
    @media (max-width: 500px) {
      display: none;
    }
  }

  .profileOrAuth {
    font-size: 28px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .left {
      display: inline-box;
      margin-top: 5px;
      &:hover {
        transition: all .2s;
        color: #3897F0;
        cursor: pointer;
        transform: scale(1.2, 1.2);
      }
    }
    .right {
      display: inline-box;
      &:hover {
        transition: all .2s;
        color: #3897F0;
        cursor: pointer;
        transform: scale(1.2, 1.2);
      }
    }
  }
`;