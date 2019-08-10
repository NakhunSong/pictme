import axios from 'axios';
import { all, fork, call, put, delay, takeLatest, takeEvery, throttle } from 'redux-saga/effects';
import { LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_SUCCESS, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, LOAD_SINGLE_POST_REQUEST, LOAD_SINGLE_POST_SUCCESS, LOAD_SINGLE_POST_FAILURE, LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../reducers/post';

// 메인 게시물 로드
function loadMainPostsAPI() {
  return axios.get('/posts');
}
function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

// 해시태그 게시물 로드
function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${encodeURIComponent(tag)}`);
}
function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

// 개별 게시물 로드
function loadSinglePostAPI(postId) {
  return axios.get(`/post/${postId}`);
}
function* loadSinglePost(action) {
  try {
    const result = yield call(loadSinglePostAPI, action.data);
    yield put({
      type: LOAD_SINGLE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_SINGLE_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadSinglePost() {
  yield takeEvery(LOAD_SINGLE_POST_REQUEST, loadSinglePost);
}

// 개별 게시물 댓글 로드
function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}
function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchLoadComments() {
  yield takeEvery(LOAD_COMMENTS_REQUEST, loadComments);
}

// 이미지 업로드
function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true,
  });
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

// 게시물 작성
function addPostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchAddPost() {
  yield throttle(2000, ADD_POST_REQUEST, addPost);
}

// 댓글 작성
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response && e.response.data,
    });
  }
}
function* watchAddComment() {
  yield throttle(2000, ADD_COMMENT_REQUEST, addComment);
}

// 게시물 LIKE
function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true,
  });
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: LIKE_POST_FAILURE,
    });
  }
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// 게시물 UNLIKE
function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, { // DELETE
    withCredentials: true,
  });
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    console.dir(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
    });
  }
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadSinglePost),
    fork(watchLoadComments),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
