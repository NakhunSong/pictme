import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LinkBoxWrapper = styled.div`
  max-width: 390px;
  max-height: 100px;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 0px;
  
  border: 1px solid #e6e6e6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  .question {
    display: inline;
    margin-right: 5px;
  }
`;

const LinkBox = ({question, pageName}) => {
  return (
    <LinkBoxWrapper>
      <div className="question">{question}</div>
      <Link href={`/${pageName === '로그인' ? 'login' : 'signup'}`}>
        <a>{pageName}</a>
      </Link>
    </LinkBoxWrapper>
  );
};

LinkBox.propTypes = {
  question: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default LinkBox;
