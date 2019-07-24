import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';

import {
  LoginFormWrapper,
  LoginFormInnerWrapper,
  TitleWrapper,
  FormWrapper
} from './style';

import {useInput} from '../signup/SignupForm';

const LoginForm = () => {
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({
      userId,
      password
    });
  },[userId, password]);
  
  return (
    <LoginFormWrapper>
      <LoginFormInnerWrapper>
        <TitleWrapper>
          <div className="title">pictme</div>
          <div className="description">
            사진으로 이야기를 공유하세요
          </div>
          <Button type="danger" size="large" block>
            <Link href="/about"><a>About us</a></Link>
          </Button>
          <div className="seperator">
            <div className="or">로그인</div>
          </div>
        </TitleWrapper>
        <FormWrapper onSubmit={onSubmit}>
          <Input size="large" placeholder="아이디" onChange={onChangeUserId} />
          <br />
          <Input size="large" placeholder="패스워드확인" onChange={onChangePassword} />
          <br />
          <Button type="danger" size="large" block htmlType="submit">로그인</Button>
        </FormWrapper>
      </LoginFormInnerWrapper>
    </LoginFormWrapper>
  );
};

export default LoginForm;