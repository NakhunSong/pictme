import produce from 'immer';
import Router from 'next/router';

const dummyPost = {
  id: 1,
  User: {
    id: 1,
    nickname: '나쿤',
    profileImg: '../static/testimg.jpg',
  },
  Images: '../static/testimg.jpg',
  content: 'testImg입니다.',
  Comments: [],
};

// post state
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  uploadImagesError: '',
  isAddingPost: false,
  postAdded: false,
  addPostErrorReason: '',
  singlePost: null, // 개별 post 정보
  isAddingComment: false,
  commentAdded: false,
  addCommentErrorReason: null,
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST';
export const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';
export const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST: {
        draft.mainPosts = [];
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS: {
        draft.mainPosts = action.data;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE: {
        break;
      }
      case LOAD_SINGLE_POST_REQUEST: {
        break;
      }
      case LOAD_SINGLE_POST_SUCCESS: {
        draft.singlePost = action.data;
        break;
      }
      case LOAD_SINGLE_POST_FAILURE: {
        break;
      }
      case LOAD_COMMENTS_REQUEST: {
        break;
      }
      case LOAD_COMMENTS_SUCCESS: {
        draft.singlePost.Comments = action.data.comments;
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImagesError = '';
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths.push(action.data);
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImagesError = action.error;
        break;
      }
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1);
        break;
      }
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true;
        draft.postAdded = false;
        draft.addPostErrorReason = '';
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false;
        draft.postAdded = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = []; // 이미지 path 초기화
        Router.push('/');
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentErrorReason = '';
        draft.isAddingComment = true;
        draft.commentAdded = false;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.singlePost.Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentErrorReason = action.error;
        draft.isAddingComment = false;
        break;
      }
      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex((v, i) => v.id === action.data.postId);
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
