import { FC } from 'react'
import Image from 'next/image'
import 'twin.macro'
import { Content, ContentWrapper, ImageWrapper } from '../components'

export const Beginnings: FC = () => {
  return (
    <>
      <Content>
        <ImageWrapper tw="md:flex-row">
          <div
            tw="md:right-0 md:absolute md:self-end z-10"
            style={{ maxWidth: '200px', bottom: '-3rem' }}
          >
            <Image
              alt="Young Manel playing football"
              src="/about/manel-football.jpg"
              width={500}
              height={715}
              layout="responsive"
            />
          </div>
          <div tw="relative w-full" style={{ maxWidth: '320px' }}>
            <Image
              alt="Young Manel playing computer games"
              src="/about/manel-computer.jpg"
              width={500}
              height={632}
              layout="responsive"
            />
          </div>
        </ImageWrapper>
        <ContentWrapper>
          <h2>Beginnings</h2>
          <p>
            The two things that I liked to do the most as a child were playing football, I played
            for several teams until 16yo because of an injury but I still love playing from time to
            time.
          </p>
          <p>
            The other one are computers, since a very child I&apos;ve been passionate about
            computers, software and technology in general. Ah, I also played a lot of video games{' '}
            <span role="img" aria-label="hehe">
              😅
            </span>
          </p>
        </ContentWrapper>
      </Content>

      <Content>
        <ContentWrapper>
          <h2>First steps towards web</h2>
          <p>
            I still do remember myself toying with Frontpage 98 with 10yo playing with tables to
            create layouts and going crazy trying to align images. At that time it was more like a
            kind of &quot;painting&quot; and having fun rather than developing, but it created the
            needed curiosity to keep digging.
          </p>
          <p>
            Some years after I started playing Counter-Strike (a lot) and it was then when I really
            started to learn programming, some design ideas and how a website was made from the
            inside, whithout a proper website, your clan wasn&apos;t going to be popular{' '}
            <span role="img" aria-label="crazy">
              🤪
            </span>
            .
          </p>
          <p>Without even knowing it, those years gave me a direction for my career.</p>
        </ContentWrapper>
        <ImageWrapper tw="md:flex-col">
          <div>
            <Image
              alt="Windows FrontPage CD Rom"
              src="/about/frontpage.jpg"
              width={640}
              height={480}
              layout="responsive"
            />
          </div>

          <div tw="md:absolute md:-bottom-20 md:-right-10" style={{ maxWidth: '200px' }}>
            <Image
              alt="Counter-Strike game initial screen"
              src="/about/counter-strike.jpg"
              width={1024}
              height={750}
              layout="responsive"
            />
          </div>
        </ImageWrapper>
      </Content>
    </>
  )
}
