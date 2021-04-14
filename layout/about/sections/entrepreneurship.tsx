import 'twin.macro'
import { FC } from 'react'
import Image from 'next/image'
import { Content, ImageWrapper, ContentWrapper } from '../components'

export const Entrepreneurship: FC = () => {
  return (
    <>
      <Content>
        <ImageWrapper>
          <div>
            <Image src="/about/butonet1.jpg" width={720} height={960} />
          </div>
          <div tw="md:absolute md:-bottom-10 md:-right-10 z-10" style={{ maxWidth: '300px' }}>
            <Image src="/about/butonet2.jpg" width={500} height={333} />
          </div>
        </ImageWrapper>
        <ContentWrapper>
          <h2>Entrepreneurship</h2>
          <p>
            Co-founded an ecommerce with my good friend Xavi on 2011, we ourselves manufactured the
            buttons with a couple of machines we bought.
          </p>
          <p>
            We created a custom ecommerce site from scratch with PHP/MySQL that allowed us to
            customize price on our own, I even created an online custom designer with jQuery{' '}
            <span role="img" aria-label="saint">
              😇
            </span>
            .
          </p>
          <p>
            Learned a toon of SEO and we managed to create a 10k monthly turnover within six months
            and 0 spent on marketing.
          </p>
          <p>I still dream on creating a company from scratch.</p>
        </ContentWrapper>
      </Content>
    </>
  )
}
