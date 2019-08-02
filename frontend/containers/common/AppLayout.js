import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LOAD_USER_REQUEST } from '../../reducers/user';

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
      {children}
    </ComponentWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AppLayout;
