import Router from 'next/router';

const dummyUser = {
  id: 0,
  nickname: '나쿤',
  Post: [],
  Followings: [],
  Follower: [],
};

export const initialState = {
  isLogginIn: false,
  isSigningUp: false,
  isSignedUp: false,
  me: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
      };
    }
    case SIGN_UP_SUCCESS: {
      console.log(action.data);
      Router.push('/login'); // 회원가입 성공 시 로그인 페이지로
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLogginIn: true,
      };
    }
    case LOG_IN_SUCCESS: {
      console.log(action.data);
      const userData = action.data;
      Router.push('/');
      return {
        ...state,
        isLogginIn: false,
        me: {
          ...dummyUser,
          userData,
        },
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLogginIn: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
