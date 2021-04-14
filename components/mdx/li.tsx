import { FC } from 'react'
import { styled } from 'twin.macro'
import { shared } from './shared'

const LiElement = styled.li`
  //border: 1px solid blue;
  ${shared}
`

export const Li: FC = (props) => <LiElement {...props} />
