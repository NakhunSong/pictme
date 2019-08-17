import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html style={{ height: '100%'}}>
        <head>
          <title>My page</title>
          <style>{`
            #__next {
              height: 100%;
            }
            div {
              align-items: stretch;
            }
          `}
          </style>
          {this.props.styleTags}
        </head>
        <body style={{ height: '100%', margin: 0}}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}