import React from 'react';
import PropTypes from 'prop-types';

const User = ({ id }) => {
  return (
    <div>유저{id}</div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = (ctx) => {
  const { id } = ctx.query;
  return { id };
};

export default User;
