import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';
import SinglePostCard from '../containers/post/SinglePostCard';
import Loading from '../components/common/Loading';
import { backUrl } from '../config/config';

const SinglePost = ({ id }) => {
  const { singlePost } = useSelector(state => state.post);

  if (!singlePost) {
    return (
      <Loading />
    );
  }
  return (
    <div>
      <Helmet
        title={`${singlePost.User.nickname}님의 글`}
        description={singlePost.content}
        meta={[{
          name: 'description', content: singlePost.content,
        }, {
          property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
        }, {
          property: 'og:description', content: singlePost.content,
        }, {
          property: 'og:image', content: singlePost.Images[0] ? `http://api.pictme.site/post_image/${singlePost.Images[0].src}` : 'https://pictme.site/favicon.ico',
        }, {
          property: 'og:url', content: `http://pictme.site/post/${id}`,
        }]}
      />
      <SinglePostCard singlePost={singlePost} />
    </div>
  );
};

SinglePost.propTypes = {
  id: PropTypes.string.isRequired,
};

SinglePost.getInitialProps = async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: id,
  });
  return { id };
};

export default SinglePost;
