import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LikerList from '../containers/user/LikerList';
import Loading from '../components/common/Loading';
import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';

const Liker = ({ id }) => {
  const { singlePost } = useSelector(state => state.post);

  if (!singlePost) {
    return (<Loading />);
  }
  return (
    <LikerList singlePost={singlePost} />
  );
};

Liker.propTypes = {
  id: PropTypes.number.isRequired,
};

Liker.getInitialProps = async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: id,
  });
  return { id: parseInt(id, 10) };
};

export default Liker;
