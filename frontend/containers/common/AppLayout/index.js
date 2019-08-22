import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';

import { LOAD_USER_REQUEST } from '../../../reducers/user';
import AuthTemplate from '../../../components/auth/AuthTemplate';
import MainTemplate from '../../../components/main/MainTemplate';
import Header from '../../main/Header';

const ComponentWrapper = styled.div`
  height: 100%;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, []);

  return (
    <ComponentWrapper>
      {me
        ? (
          <MainTemplate>
            <Header />
            {children}
          </MainTemplate>
        )
        : (
          <AuthTemplate>
            {children}
          </AuthTemplate>
        )
      }
    </ComponentWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppLayout;
