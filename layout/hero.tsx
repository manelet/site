import { FC } from 'react'
import tw, { styled } from 'twin.macro'
import { Wrapper } from './block'

interface HeroProps {
  stripHeaderHeight: boolean
}

const HeroWrapper = styled(Wrapper)`
  ${tw`relative w-full justify-center!`}

  height: ${({ stripHeaderHeight }: HeroProps) =>
    stripHeaderHeight ? 'calc(100vh - 60px)' : '100vh'};
`

const Hero: FC<HeroProps> = ({ children, stripHeaderHeight = true }) => {
  return (
    <HeroWrapper as="section" stripHeaderHeight={stripHeaderHeight}>
      {children}
    </HeroWrapper>
  )
}

export default Hero
