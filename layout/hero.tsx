import { FC } from 'react'
import styled from 'styled-components'
import { Wrapper, Inner } from './block'

interface HeroProps {
  stripHeaderHeight: boolean
}

const HeroWrapper = styled(Wrapper)`
  width: 100%;
  height: ${({ stripHeaderHeight }: HeroProps) =>
    stripHeaderHeight ? 'calc(100vh - 60px)' : '100vh'};
  justify-content: center;
`

const Hero: FC<HeroProps> = ({ children, stripHeaderHeight = true }) => {
  return (
    <HeroWrapper as="section" stripHeaderHeight={stripHeaderHeight}>
      <Inner>{children}</Inner>
    </HeroWrapper>
  )
}

export default Hero
