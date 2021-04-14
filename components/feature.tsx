import { FC } from 'react'
import tw, { styled } from 'twin.macro'

const FeatureWrapper = styled.div`
  ${tw`flex w-full items-center my-6`}

  :nth-child(odd) {
    ${tw`flex-col md:flex-row`}

    div:nth-child(odd) {
      ${tw`md:text-left`}
    }

    div:nth-child(even) {
      ${tw`md:text-right`}
    }
  }

  :nth-child(even) {
    ${tw`flex-col md:flex-row-reverse`}

    div:nth-child(odd) {
      ${tw`md:text-right`}
    }

    div:nth-child(even) {
      ${tw`md:text-left`}
    }
  }

  > div {
    ${tw`w-full`}
  }
`

export const Feature: FC = ({ children }) => {
  return (
    <FeatureWrapper>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </FeatureWrapper>
  )
}
