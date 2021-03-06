import 'twin.macro'
import Header from './header'
import Footer from './footer'
import { FC } from 'react'

export { Provider, useLayout } from './state'

const Layout: FC<{ background: string }> = ({ children, background }) => {
  return (
    <>
      <div tw="flex flex-col flex-grow">
        {background && (
          <div tw="w-full absolute top-0 left-0" style={{ background, height: '350px' }} />
        )}
        <Header />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
