import produce from 'immer';

const dummyPost = {
  id: 1,
  User: {
    id: 1,
    nickname: '나쿤',
    profileImg: '../static/testimg.jpg',
  },
  img: '../static/testimg.jpg',
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
  mainPosts: [{
    id: 0,
    User: {
      id: 2,
      nickname: '낰낰',
      profileImg: '../static/testimg.jpg',
    },
    img: '../static/testimg.jpg',
    content: 'testImg입니다.',
    Comments: [],
  }],
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST: {
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        dummyPost.Comments.push(dummyComment);
        draft.mainPosts.push(dummyPost);
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
