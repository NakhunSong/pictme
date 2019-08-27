import React from 'react';
import Head from 'next/head';
import { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Helmet from 'react-helmet';

import reducer from '../reducers';
import rootSaga from '../sagas';

import AppLayout from '../containers/common/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Pictme = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="pictme"
          htmlAttributes={{ lang: 'ko' }}
          meta={[{
            charset: 'UTF-8',
          }, {
            name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: 'Welcome to pictme.',
          }, {
            property: 'og:title', content: 'pictme',
          }, {
            property: 'og:description', content: 'Welcome to pictme.',
          }, {
            property: 'og:type', content: 'website',
          }, {
            property: 'og:image', content: 'http://pictme.xyz/favicon.ico',
          }]}
          link={[{
            rel: 'shortcut icon', href: '/favicon.ico',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          }]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  );
};

Pictme.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

Pictme.getInitialProps = async (context) => {
  const { ctx, Component } = context; // ctx: pages, store, ..., Component: pages file(login, postup, ...)
  let pageProps = {};

  const state = ctx.store.getState(); // store에서 state 로드
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; // 서버환경이면 headers에서 직접 쿠키 가져오기, 클라환경이면 빈값('')
  // console.log('-----ctx.isServer------ : ', ctx.isServer);
  Axios.defaults.headers.Cookie = ''; // 이전 로그인한 사용자 쿠키가 frontend 서버(axios) 패키지에 계속 남아있어, 방지하고자 초기화.
  if (ctx.isServer && cookie) {
    Axios.defaults.headers.Cookie = cookie; // axios에 쿠키를 기본적으로 심어주는 기능(브라우저가 제공하는 기능 직접 구현해야함).
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
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
  store.sagaTask = sagaMiddleware.run(rootSaga); // 사가 동작
  return store;
};

export default withRedux(configureStore)(withReduxSaga(Pictme));
