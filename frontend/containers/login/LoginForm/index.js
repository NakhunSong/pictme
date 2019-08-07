import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Input } from 'antd';

import {
  LoginFormWrapper,
  LoginFormInnerWrapper,
  TitleWrapper,
  FormWrapper,
} from './style';

import { useInput } from '../../signup/SignupForm';
import { LOG_IN_REQUEST } from '../../../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector(state => state.user);
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!userId || !userId.trim() || !password || !password.trim()) { // 공백 작성 막음.
      return alert('내용을 채워주시기 바랍니다.');
    }
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId,
        password,
      },
    });
  }, [userId, password]);

  return (
    <LoginFormWrapper>
      <LoginFormInnerWrapper>
        <TitleWrapper>
          <div className="title">pictme</div>
          <div className="description">
            사진으로 이야기를 공유하세요
          </div>
          <Button type="primary" size="large" block>
            <Link href="/about"><a>About us</a></Link>
          </Button>
          <div className="seperator">
            <div className="or">로그인</div>
          </div>
        </TitleWrapper>
        <FormWrapper onSubmit={onSubmit}>
          <Input value={userId} size="large" placeholder="아이디" onChange={onChangeUserId} />
          <br />
          <Input value={password} size="large" placeholder="패스워드확인" onChange={onChangePassword} type="password" />
          <br />
          <Button type="primary" size="large" block htmlType="submit" loading={isLoggingIn}>로그인</Button>
        </FormWrapper>
      </LoginFormInnerWrapper>
    </LoginFormWrapper>
  );
};

export default LoginForm;
