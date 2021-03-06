import 'twin.macro'
import { FC } from 'react'

export const Beginnings: FC = () => {
  return (
    <>
      <div tw="flex flex-col md:flex-row w-full items-center my-6">
        <div tw="w-full">images</div>
        <div tw="w-full">
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
        </div>
      </div>

      <div tw="flex flex-col-reverse md:flex-row w-full items-center my-6">
        <div tw="w-full">
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
        </div>
        <div tw="w-full">images</div>
      </div>
    </>
  )
}
