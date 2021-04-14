import Image from 'next/image'
import { FC, HTMLProps } from 'react'
import tw, { styled } from 'twin.macro'

const ImageWrapper = styled.div`
  ${tw`w-full md:my-10`}

  > div {
    border-radius: 6px;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    > div {
      margin: -2em !important;
    }
  }
`

export const Img: FC<HTMLProps<HTMLImageElement>> = ({ src, width, height }) => {
  return (
    <ImageWrapper>
      <Image src={src} layout="responsive" width={width} height={height} />
    </ImageWrapper>
  )
}
