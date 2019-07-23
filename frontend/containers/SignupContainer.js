import React from 'react';
import Link from 'next/link';

import SignupTemplate from '../components/signup/SignupTemplate';
import SignupForm from '../components/signup/SignupForm';

const SignupContainer = () => {
  return (
    <SignupTemplate>
      <SignupForm />
      <Link><a>로그인</a></Link>
    </SignupTemplate>
  );
};

export default SignupContainer;