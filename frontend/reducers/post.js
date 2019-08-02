import produce from 'immer';

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

const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: '나쿤',
  },
  createdAt: new Date(),
  content: '더미 댓글입니다.',
};

// post state
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  isAddingPost: false,
  postAdded: false,
  addPostErrorReason: '',
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST: {
        draft.mainPosts = [];
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        draft.mainPosts = action.data;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE: {
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
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
