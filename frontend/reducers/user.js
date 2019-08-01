import Router from 'next/router';

const dummyUser = {
  id: 0,
  nickname: '나쿤',
  profileImg: '../public/testImg.jpg',
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLogginIn: false,
  loginErrorReason: '',
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  me: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: '',
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
        signUpErrorReason: action.error,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLogginIn: true,
        loginErrorReason: '',
      };
    }
    case LOG_IN_SUCCESS: {
      Router.push('/');
      return {
        ...state,
        isLogginIn: false,
        me: action.data,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLogginIn: false,
        loginErrorReason: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
