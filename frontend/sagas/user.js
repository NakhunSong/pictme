import axios from 'axios';
import { all, fork, call, put, delay, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE, UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE } from '../reducers/user';

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

// 로그아웃
function logOutAPI() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}
function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

// 사용자 정보 불러오기(로그인 유저)
function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true,
  });
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
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

// 사용자 팔로우
function followUserAPI(userId) {
  return axios.post(`/user/${userId}/follow/`, {}, {
    withCredentials: true,
  });
}
function* followUser(action) {
  try {
    const result = yield call(followUserAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchFollowUser() {
  yield takeEvery(FOLLOW_USER_REQUEST, followUser);
}

// 사용자 언팔로우
function unfollowUserAPI(userId) {
  return axios.delete(`/user/${userId}/follow/`, {
    withCredentials: true,
  });
}
function* unfollowUser(action) {
  try {
    const result = yield call(unfollowUserAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchUnfollowUser() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollowUser);
}

// 팔로잉 목록 불러오기
function loadFollowingsAPI(userId) {
  return axios.get(`/user/${userId}/followings/`, {
    withCredentials: true,
  });
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

// 팔로워 목록 불러오기
function loadFollowersAPI(userId) {
  return axios.get(`/user/${userId}/followers/`, {
    withCredentials: true,
  });
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchFollowUser),
    fork(watchUnfollowUser),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
  ]);
}
