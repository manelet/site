import tw, { css } from 'twin.macro'

export const contentLinks = css`
  a {
    ${tw`text-blue-600`}

    &:hover {
      text-decoration: underline;
    }
  }
`
