import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon, Input, Button } from 'antd';

import { device } from '../../config/device';
import { LOG_OUT_REQUEST } from '../../reducers/user';

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

  .searchBox {
    @media (max-width: 500px) {
      display: none;
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
  const dispatch = useDispatch();
  const { isLoggingOut } = useSelector(state => state.user);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

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
            <Button type="primary" onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
          </div>
        </div>
      </Menu>
    </header>
  );
};

export default Header;
