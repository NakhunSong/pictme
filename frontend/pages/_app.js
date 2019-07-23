import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100%;
  background: #fafafa;
`;
const ComponentWrapper = styled.div`
  height: 100%;
`;

const Pictme = ({ Component }) => {
  return (
    <AppWrapper>
      <Head>
        <title>pictme</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <ComponentWrapper>
        <Component />
      </ComponentWrapper>
    </AppWrapper>
  );
};

Pictme.propTypes = {
  Component: PropTypes.elementType,
};

export default Pictme;