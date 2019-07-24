import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Button, Checkbox } from 'antd';

import {
  SignupFormWrapper,
  SignupFormInnerWrapper,
  TitleWrapper,
  FormWrapper
} from './style';

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const SignupForm = () => {
  const [userId, onChangeUserId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  
  const [passwordCheck, setPawordCheck] = useState('');
  const [term, setTerm] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);     
    setPawordCheck(e.target.value);
  }, [password, passwordCheck]);
  
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(!term);
  }, [term]);
  
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (passwordError) { // 비밀번호가 다르다면
      return setPasswordError(true);
    }
    if (!term) { // 동의 안되어있다면
      return setTermError(true);
    }
    console.log({
      userId,
      nickname,
      password
    });
    Router.push("/login"); // 회원가입 성공 시 로그인 페이지로
  }, [term, passwordError, userId, nickname, password]);

  return (
    <SignupFormWrapper>
      <SignupFormInnerWrapper>
        <TitleWrapper>
          <div className="title">pictme</div>
          <div className="description">
            사진으로 이야기를 공유하세요
          </div>
          <Button type="danger" size="large" block>
            <Link href="/about"><a>About us</a></Link>
          </Button>
          <div className="seperator">
            <div className="or">회원가입</div>
          </div>
        </TitleWrapper>
        <FormWrapper onSubmit={onSubmit}>
          <Input size="large" placeholder="아이디" onChange={onChangeUserId} />
          <br />
          <Input size="large" placeholder="닉네임" onChange={onChangeNickname} />
          <br />
          <Input size="large" placeholder="패스워드" onChange={onChangePassword} />
          <br />
          <Input size="large" placeholder="패스워드확인" onChange={onChangePasswordCheck} />
          <br />
          {passwordError ? <div style={{ color: 'red' }}>패스워드가 다릅니다.</div> : null}
          <Checkbox onChange={onChangeTerm}>정보 제공에 동의합니다.</Checkbox>
          {termError ? <div style={{ color: 'red' }}>정보 제공에 동의해주세요.</div> : null}
          <Button type="danger" size="large" block htmlType="submit">가입</Button>
          <div className="policy">
            가입하면 pictme의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
          </div>
        </FormWrapper>
      </SignupFormInnerWrapper>
    </SignupFormWrapper>
  );
};

export default SignupForm;