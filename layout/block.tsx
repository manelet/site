import { FC } from 'react'
import { CSSProp } from 'styled-components'
import tw, { styled } from 'twin.macro'

interface BlockProps {
  as?: keyof HTMLElementTagNameMap
  customCss?: Array<CSSProp<any>>
}

export const Wrapper = styled.div`
  ${tw`
  w-full
  flex
  flex-col`}
`

export const Inner = styled.div(({ as }: BlockProps) => [
  tw`
    relative
    flex-col
    flex
    p-3
    w-full
    md:justify-between
    md:flex-col
    md:m-auto
    md:max-w-3xl`,
  as === 'header' && tw`flex flex-row place-content-between items-center`,
])

const Block: FC<BlockProps> = ({ as = 'section', children, customCss = [] }) => {
  return (
    <Wrapper as={as} css={[...customCss]}>
      <Inner>{children}</Inner>
    </Wrapper>
  )
}

export default Block
