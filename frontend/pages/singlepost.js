import React from 'react';

const SinglePost = () => {
  return (
    <div>
      포스트
    </div>
  );
};

SinglePost.getInitialProps = async (context) => {
  console.log('singlepost context: ', context.query.id);
};

export default SinglePost;
