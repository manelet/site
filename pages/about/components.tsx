import tw, { styled } from 'twin.macro'

export const ContentWrapper = styled.div`
  ${tw`w-full relative`}

  :nth-child(odd) {
    ${tw`md:mr-12`}
  }

  :nth-child(even) {
    ${tw`md:ml-12`}
  }
`

export const ImageWrapper = styled.div`
  ${tw`w-full relative flex flex-grow items-center justify-center`}

  :nth-child(odd) {
    ${tw`md:-ml-24`}
  }

  :nth-child(even) {
    ${tw`md:-mr-24`}
  }

  > div {
    ${tw`w-full`}
  }

  > div:nth-child(1) {
    ${tw``}
  }

  > div:nth-child(2) {
    ${tw``}
  }
`

export const Content = styled.div`
  ${tw`flex w-full items-center my-16`}

  :nth-child(odd) {
    ${tw`flex-col-reverse md:flex-row`}
  }

  :nth-child(even) {
    ${tw`flex-col md:flex-row`}
  }
`
