import tw, { styled } from 'twin.macro'

const FeatureWrapper = styled.div`
  ${tw`flex  md:flex-row w-full items-center my-6`}

  :nth-child(odd) {
    ${tw`flex-col`}
  }

  :nth-child(even) {
    ${tw`flex-col-reverse`}
  }

  > div {
    ${tw`w-full`}
  }
`

export const Feature = ({ children }) => {
  return (

  )
}
