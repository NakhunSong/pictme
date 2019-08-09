import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import reducer from '../reducers';
import rootSaga from '../sagas';

import AppLayout from '../containers/common/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppWrapper = styled.div`
  height: 100%;
  margin: 0px;
  padding: 0px;
`;

const Pictme = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Head>
          <title>pictme</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AppWrapper>
    </Provider>
  );
};

Pictme.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

Pictme.getInitialProps = async (context) => {
  console.log('appjs context: ', context);
  const { ctx, Component } = context; // ctx: pages, store, ..., Component: pages file(login, postup, ...)
  let pageProps = {};

  // const state = ctx.store.getState(); // store에서 state 로드
  // if (!state.user.me) {
  //   ctx.store.dispatch({
  //     type: LOAD_USER_REQUEST,
  //   });
  // }
  if (Component.getInitialProps) { // pages file에 getInitialProps 있다면 실행
    pageProps = await Component.getInitialProps(ctx) || {}; // {}로 undefined에러 방지
  }
  return { pageProps };
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
