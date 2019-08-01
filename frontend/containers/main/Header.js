import React from 'react';
import styled from 'styled-components';
import { Icon, Input, Button } from 'antd';

const Menu = styled.div`
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
    font-size: 30px;
    transition: all .2s;
    &:hover {
      color: #3897F0;
      cursor: pointer;
      transform: scale(1.2, 1.2);
    }
  }

  .profileOrAuth {
    font-size: 28px;
    
    .left {
      margin-right: 10px;
      &:hover {
        transition: all .2s;
        color: #3897F0;
        cursor: pointer;
        transform: scale(1.2, 1.2);
      }
    }
    .right {
      &:hover {
        transition: all .2s;
        color: #3897F0;
        cursor: pointer;
        transform: scale(1.2, 1.2);
      }
    }
  }
`;

const Header = () => {
  return (
    <header style={{ width: '100%' }}>
      <Menu>
        <div className="logo">
          pictme
        </div>
        <div className="searchBox">
          <Input.Search
            style={{ verticalAlign: 'middle' }}
          />
        </div>
        <div className="profileOrAuth">
          <div className="left">
            <Icon type="user" />
          </div>
          <div className="right">
            <Button type="primary">로그아웃</Button>
          </div>
        </div>
      </Menu>
    </header>
  );
};

export default Header;
