import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Cookies from 'js-cookie'
import cn from 'clsx'
import { ReactElement } from 'react'

interface CustomDocumentProps {
  theme: 'light' | 'dark'
}

export default class MyDocument extends Document<DocumentInitialProps & CustomDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { theme: string }> {
    // const theme = ctx.req ? ctx.req.cookies.theme || 'light' : Cookies.get('theme') || 'light'
    const theme = Cookies.get('theme') || 'light'
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line
          enhanceApp: (App: any) => (props) =>
            sheet.collectStyles(<App {...props} theme={theme} />),
        })
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        theme,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): ReactElement {
    return (
      <Html className={cn(this.props.theme === 'dark' && 'dark')}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
