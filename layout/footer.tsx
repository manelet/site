import tw from 'twin.macro'
import { FC } from 'react'
import { Wrapper, Inner } from './block'
import Logo from './logo'
import styled from 'styled-components'

export const FOOTER_HEIGHT = 125

const FooterWrapper = styled(Wrapper)`
  ${tw`flex justify-center`}
  height: ${({ height }: { height: number }) => `${height}px;`};
`

const Footer: FC = () => {
  return (
    <FooterWrapper as="footer" height={FOOTER_HEIGHT}>
      <Inner>
        <div tw="flex justify-between items-center">
          <Logo width="small" />
          <div tw="text-xs">
            made with{' '}
            <span role="img" aria-label="heart">
              💖
            </span>{' '}
            and{' '}
            <span role="img" aria-label="coffee">
              ☕️
            </span>{' '}
            in Barcelona
          </div>
        </div>
      </Inner>
    </FooterWrapper>
  )
}

export default Footer
