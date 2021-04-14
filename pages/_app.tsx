import { AppProps } from 'next/app'
import { FC } from 'react'
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
      <Provider theme={theme}>
        <Layout background={pageProps.project?.background}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default App
