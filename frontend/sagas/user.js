import axios from 'axios';
import { all, fork, call, put, delay, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../reducers/user';

// 회원가입
function signUpAPI(signUpData) {
  return axios.post('/user/', signUpData);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.dir('signup result: ', result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.dir(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// 로그인
function logInAPI(loginData) {
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log('login result', result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}
function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// 사용자 정보 불러오기(로그인 유저)
function loadUserAPI() {
  return axios.get('/user/', {
    withCredentials: true,
  });
}
function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogIn),
    fork(watchLoadUser),
  ]);
}
