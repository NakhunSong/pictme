import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props => sheet.collectStyles(<App {...props} />)); // App : _app.js. _app.js를 실행하는 부분.
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags, helmet: Helmet.renderStatic() };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          <style>
          {`
            #__next {
              height: 100%;
            }
            div {
              align-items: stretch;
            }
          `}
          </style>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          {/* Main: _app.js */}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  helmet: PropTypes.object.isRequired,
  styleTags: PropTypes.object.isRequired,
};

export default MyDocument;
