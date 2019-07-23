import React from 'react';
import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

const SignupFormWrapper = styled.div`
  max-width: 390px;
  max-height: 650px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
`;
const SignupFormInnerWrapper = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  background: white;
  padding: 10px;
  height: 100%;
`;
const TitleWrapper = styled.div`
  margin-top: 10px;
  .title {
    font-size: 50px;
    font-weight: 700;
    text-align: center;
  }
  .description {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  button {
    margin-top: 15px;
  }
  .seperator {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
    margin-top: 1.5rem;
    position: relative;
    margin-bottom: 1.5rem;
    .or {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-weight: 900;
        color: e6e6e6;
        font-size: 0.9rem;
    }
  }
`;
const FormWrapper = styled(Form)`
  margin-top: 2rem;
  vertical-align: baseline;
  input {
    margin-bottom: 6px;
  }
  button {
    margin-top: 10px;
  }
  .policy {
    margin-top: 2rem;
    font-size: 18px;
    text-align: center;
  }
`;
const SignupForm = () => {
  return (
    <SignupFormWrapper>
      <SignupFormInnerWrapper>
        <TitleWrapper>
          <div className="title">pictme</div>
          <div className="description">
            사진으로 대화를 나누세요
          </div>
          <Button type="danger" size="large" block>
            <Link href="/about"><a>About us</a></Link>
          </Button>
          <div className="seperator">
            <div className="or">회원가입</div>
          </div>
        </TitleWrapper>
        <FormWrapper>
          <Input size="large" placeholder="아이디" />
          <br />
          <Input size="large" placeholder="닉네임"/>
          <br />
          <Input size="large" placeholder="패스워드"/>
          <br />
          <Input size="large" placeholder="패스워드확인"/>
          <br />
          <Checkbox>정보 제공에 동의합니다.</Checkbox>
          <Button type="danger" size="large" block>가입</Button>
          <div className="policy">
            가입하면 pictme의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
          </div>
        </FormWrapper>
      </SignupFormInnerWrapper>
    </SignupFormWrapper>
  );
};

export default SignupForm;