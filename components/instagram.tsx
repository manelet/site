import tw, { css, styled } from 'twin.macro'
import { useState, useEffect, FC } from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Img from 'next/image'
import Block from '../layout/block'
import { InstagramApiItem } from '../pages/api/instagram'
import Button from './button/button'

dayjs.extend(timezone)
dayjs.extend(utc)
const LS_KEY = 'ig-data'

const Instagram: FC = () => {
  const [images, setImages] = useState(null)

  useEffect(() => {
    const cachedImages = getCached()

    if (cachedImages) {
      setImages(cachedImages)
    } else {
      fetch('/api/instagram')
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }

          return null
        })
        .then((images) => {
          if (images) {
            setCache(images)
            setImages(images)
          }
        })
    }
  }, [])

  return (
    <Block>
      <div tw="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800 rounded-xl justify-center items-start my-10">
        <div tw="p-10">
          <h2>I love to cook! And you?</h2>
          <p>Feel free to follow me on Instagram to see my recipes and exchange dishes ideas!</p>
          <Button as="button" theme="instagram">
            @maneleat
          </Button>
        </div>
        <div
          css={css`
            ${tw`flex flex-wrap w-full max-w-xs`}
            perspective: 5000px;
            perspective-origin: 0 450px;
          `}
        >
          {images &&
            images.length &&
            images.map((image, i) => {
              return (
                <ImgWrapper key={`ig-img-${i}`}>
                  <a href={image.permalink} target="_blank" title={image.caption} rel="noreferrer">
                    <Img
                      width={128}
                      height={128}
                      src={image.media_url}
                      alt={image.id}
                      title={image.caption}
                    />
                  </a>
                </ImgWrapper>
              )
            })}
        </div>
      </div>
    </Block>
  )
}

const ImgWrapper = styled.div`
  ${tw`odd:mr-2 overflow-hidden m-auto my-2 rounded cursor-pointer`}
  width: 128px;
  height: 128px;
  transform: translateY(50px) scale(1);
  transition: all 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  :hover {
    transform: translateY(50px) scale(1.05) !important;
    ${tw`shadow-xl`}
  }
`

function getCached(): boolean | InstagramApiItem[] {
  try {
    const cache = JSON.parse(localStorage.getItem(LS_KEY))

    if (!cache) {
      return false
    }

    const diff = dayjs().diff(dayjs(cache.date), 'hour')

    if (diff >= 12) {
      localStorage.removeItem(LS_KEY)
      return false
    }

    return cache.images
  } catch (err) {
    console.error(err)
    return false
  }
}

function setCache(images): void {
  localStorage.setItem(LS_KEY, JSON.stringify({ date: dayjs().toString(), images }))
}

export default Instagram
