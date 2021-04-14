import { FC } from 'react'
import { styled } from 'twin.macro'
import { shared } from './shared'

const PElement = styled.p`
  ${shared}//border: 1px solid red;
`

export const P: FC = (props) => <PElement {...props} />
