import { FC } from 'react'
import 'twin.macro'
import tw, { styled } from 'twin.macro'

const FeatureWindowWrapper = styled.div`
  ${tw`w-full overflow-y-scroll`}
  height: 400px;
`

const FeatureWindowInner = styled.div`
  ${tw`w-full`}
  height: 400px;
`

export const FeatureWindow: FC = ({ children }) => {
  return (
    <FeatureWindowWrapper>
      <FeatureWindowInner>{children}</FeatureWindowInner>
    </FeatureWindowWrapper>
  )
}
