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
      <Html lang="en" className={cn(this.props.theme === 'dark' && 'dark')}>
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER}');</script>`,
              }}
            />
          )}
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" href="https://fonts.cdnfonts.com/css/cascadia-code" as="style" />
        </Head>
        <body>
          {process.env.NODE_ENV === 'production' && (
            <noscript>
              <iframe
                title="gtm"
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
