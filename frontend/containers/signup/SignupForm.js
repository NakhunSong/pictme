import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Input, Button, Checkbox } from 'antd';

import {
  SignupFormWrapper,
  SignupFormInnerWrapper,
  TitleWrapper,
  FormWrapper,
} from './style';
import { SIGN_UP_REQUEST } from '../../reducers/user';

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector(state => state.user);

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

  const onChangeTerm = useCallback(() => {
    setTermError(false);
    setTerm(!term);
  }, [term]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!userId || !userId.trim() || !password || !password.trim() || !nickname || !nickname.trim()) { // 공백 작성 막음.
      return alert('내용을 채워주시기 바랍니다.');
    }
    if (passwordError) { // 비밀번호가 다르다면
      return setPasswordError(true);
    }
    if (!term) { // 동의 안되어있다면
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId,
        nickname,
        password,
      },
    });
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
          <Input value={userId} size="large" placeholder="아이디" onChange={onChangeUserId} />
          <br />
          <Input value={nickname} size="large" placeholder="닉네임" onChange={onChangeNickname} />
          <br />
          <Input value={password} size="large" placeholder="패스워드" onChange={onChangePassword} type="password" />
          <br />
          <Input value={passwordCheck} size="large" placeholder="패스워드확인" onChange={onChangePasswordCheck} type="password" />
          <br />
          {passwordError ? <div style={{ color: 'red' }}>패스워드가 다릅니다.</div> : null}
          <Checkbox onChange={onChangeTerm}>정보 제공에 동의합니다.</Checkbox>
          {termError ? <div style={{ color: 'red' }}>정보 제공에 동의해주세요.</div> : null}
          <Button type="primary" size="large" block htmlType="submit" loading={isSigningUp}>가입</Button>
          <div className="policy">
            가입하면 pictme의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
          </div>
        </FormWrapper>
      </SignupFormInnerWrapper>
    </SignupFormWrapper>
  );
};

export default SignupForm;
