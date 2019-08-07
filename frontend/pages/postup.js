import React from 'react';

import MainTemplate from '../components/main/MainTemplate';
import Header from '../containers/main/Header';
import PostForm from '../containers/post/PostForm';

const Postup = () => {
  return (
    <MainTemplate>
      <Header />
      <PostForm />
    </MainTemplate>
  );
};

export default Postup;
