import React, { useCallback } from 'react';
import Router from 'next/router';
import Proptypes from 'prop-types';
import { message, Button } from 'antd';

import {
  ResultWrapper,
} from './style';

const ResultScreen = ({ status, title, page }) => {
  const handleGoPage = useCallback(() => {
    message.success('메인페이지로 이동합니다.');
    Router.push(`${page}`);
  }, []);
  return (
    <ResultWrapper
      status={status}
      title={title}
      extra={(
        <Button type="primary" key="go_main" onClick={handleGoPage}>
          메인 페이지로
        </Button>
      )}
    />
  );
};

ResultScreen.propTypes = {
  status: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  page: Proptypes.string.isRequired,
};

export default ResultScreen;
