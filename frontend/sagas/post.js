import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';
import { LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_SUCCESS } from '../reducers/post';

// 메인 게시물 로드
function* loadMainPosts() {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
    });
  }
}
function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
  ]);
}
