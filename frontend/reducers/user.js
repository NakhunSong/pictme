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
  isLoggingIn: false,
  isLoggingOut: false,
  loginErrorReason: '',
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  me: null, // 사용자 정보
  loadUserErrorReason: '',
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

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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
        isLoggingIn: true,
        loginErrorReason: '',
      };
    }
    case LOG_IN_SUCCESS: {
      Router.push('/');
      return {
        ...state,
        isLoggingIn: false,
        me: action.data,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        loginErrorReason: action.error,
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        loadUserErrorReason: '',
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        me: action.data,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
        loadUserErrorReason: action.error,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
