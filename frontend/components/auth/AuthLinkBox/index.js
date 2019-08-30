import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  LinkBoxWrapper,
} from './style';

const AuthLinkBox = ({ question, pageName }) => {
  return (
    <LinkBoxWrapper>
      <div className="question">{question}</div>
      <Link href={`/${pageName === '로그인' ? 'login' : 'signup'}`}>
        <a>{pageName}</a>
      </Link>
    </LinkBoxWrapper>
  );
};

AuthLinkBox.propTypes = {
  question: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default AuthLinkBox;
