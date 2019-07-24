import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const AppWrapper = styled.div`
  height: 100%;
  background: #fafafa;
  margin: 0px;
  padding: 0px;
`;
const ComponentWrapper = styled.div`
  height: 100%;
`;

const Pictme = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Head>
          <title>pictme</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
        </Head>
        <ComponentWrapper>
          <Component />
        </ComponentWrapper>
      </AppWrapper>
    </Provider>
  );
};

Pictme.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga); // 사가 동작
  return store;
};

export default withRedux(configureStore)(Pictme);
