import React from 'react';
import styled from 'styled-components';
import { Icon, Input } from 'antd';

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
    transition: all .2s;
    &:hover {
      color: #3897F0;
      cursor: pointer;
      transform: scale(1.2, 1.2);
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
          <Icon type="user" />
        </div>
      </Menu>
    </header>
  );
};

export default Header;
