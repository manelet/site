import { FC } from 'react'
import tw, { styled } from 'twin.macro'
import { Wrapper } from './block'

const HeroWrapper = styled(Wrapper)`
  ${tw`relative w-full justify-center!`}
  height: calc(100vh - 60px);
`

const Hero: FC = ({ children }) => <HeroWrapper as="section">{children}</HeroWrapper>

export default Hero
