import { AppProps } from 'next/app'
import { FC } from 'react'
import { ThemeProvider } from 'next-themes'
import Layout, { Provider } from '../layout/layout'
import { GlobalStyles } from '../styles/globals'

import '../styles/code.css'

export type AppPropsEnhanced = AppProps & {
  theme: 'dark' | 'light'
}

const App: FC<AppPropsEnhanced> = ({ Component, pageProps, theme }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider attribute="class" enableSystem={false}>
        <Provider theme={theme}>
          <Layout background={pageProps.project?.background}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
