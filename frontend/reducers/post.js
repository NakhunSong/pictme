import produce from 'immer';
import Router from 'next/router';

// post state
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  uploadImagesError: '',
  isAddingPost: false,
  postAdded: false,
  hasMorePost: false,
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

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

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

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_LIKER_REQUEST = 'LOAD_LIKER_REQUEST';
export const LOAD_LIKER_SUCCESS = 'LOAD_LIKER_SUCCESS';
export const LOAD_LIKER_FAILURE = 'LOAD_LIKER_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS: {
        action.data.forEach((post) => {
          draft.mainPosts.push(post);
        });
        draft.hasMorePost = action.data.length === 12;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE: {
        break;
      }
      case LOAD_SINGLE_POST_REQUEST: {
        draft.singlePost = null;
        break;
      }
      case LOAD_SINGLE_POST_SUCCESS: {
        draft.singlePost = action.data;
        break;
      }
      case LOAD_SINGLE_POST_FAILURE: {
        break;
      }
      case LOAD_USER_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_USER_POSTS_SUCCESS: {
        const posts = action.data;
        let postList = [];
        posts.map((v, i) => {
          postList.push(v);
          if ((i + 1) % 3 === 0) {
            draft.mainPosts.push(postList);
            postList = [];
          }
        });
        if (postList.length !== 0) {
          draft.mainPosts.push(postList);
        }
        draft.hasMorePost = action.data.length === 12;
        break;
      }
      case LOAD_USER_POSTS_FAILURE: {
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
      case REMOVE_POST_REQUEST: {
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex((v, i) => v.id === action.data);
        draft.mainPosts.splice(postIndex, 1);
        break;
      }
      case REMOVE_POST_FAILURE: {
        break;
      }
      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        // const postIndex = draft.mainPosts.findIndex((v, i) => v.id === action.data.postId);
        // draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        draft.singlePost.Likers.unshift({ id: action.data.userId });
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        // const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
        // draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        const likeIndex = draft.singlePost.Likers.findIndex(v => v.id === action.data.userId);
        draft.singlePost.Likers.splice(likeIndex, 1);
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
