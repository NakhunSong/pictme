import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Icon, Input, Button } from 'antd';

import { device } from '../../../config/device';
import { LOG_OUT_REQUEST } from '../../../reducers/user';
import {
  Menu,
} from './style';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggingOut, me } = useSelector(state => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <header style={{ width: '100%' }}>
      <Menu>
        <div className="logo">
          <Link href="/"><a>pictme</a></Link>
        </div>
        <div className="searchBox">
          <Input.Search
            style={{ verticalAlign: 'middle', width: '280px' }}
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
