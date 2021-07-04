import tw, { styled } from 'twin.macro'
import Logo from './logo'
import { Wrapper, Inner } from './block'
import Menu from './menu'
import { FC } from 'react'

const HeaderWrapper = styled(Wrapper)`
  height: var(--nav-height);
  position: sticky;
  top: 0;
  background-color: transparent;
  z-index: 200;

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 60px;
    backdrop-filter: blur(3px);
    filter: blur(3px);
    z-index: 10;
  }
`

const HeaderInner = styled(Inner)`
  ${tw`z-20 flex-row! justify-between!`}
`

const Header: FC = () => {
  return (
    <HeaderWrapper as="header">
      <HeaderInner>
        <Logo />
        <Menu />
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
