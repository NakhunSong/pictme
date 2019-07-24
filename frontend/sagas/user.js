import { all, fork, put, delay, takeLatest, throttle } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

// 회원가입
function* signUp(action) {
  try {
    yield delay(2000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}
function* watchSignup() {
  yield throttle(2000, SIGN_UP_REQUEST, signUp);
}

// 로그인
function* logIn(action) {
  try {
    yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogIn),
  ]);
}
