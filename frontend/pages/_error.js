import React from 'react';
import PropTypes from 'prop-types';

import ResultScreen from '../components/common/ResultScreen';

const MyError = ({ statusCode }) => {
  return (
    <ResultScreen status={statusCode} page="/" />
  );
};

MyError.propTypes = {
  statusCode: PropTypes.number,
};

MyError.defaultProps = {
  statusCode: 400,
};

MyError.getInitialProps = async (context) => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
      ? err.statusCode
      : null; // server로 구동시 context.res와 context.req 존재
};

export default MyError;
