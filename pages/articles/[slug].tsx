import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import Image from 'next/image'
import { FC } from 'react'
import 'twin.macro'
import { Article } from '../../@types/articles'

import { getSlugs, find } from '../../content'
import Block from '../../layout/block'
import { formattedDate } from '../../lib/utils'

const ArticlePage: FC<Article> = ({ mdx, data }) => {
  const content = hydrate(mdx, { components: {} })

  return (
    <Block>
      <h1 tw="text-4xl text-center">{data.title}</h1>

      <div tw="flex items-center justify-between text-gray-400 my-10">
        <time tw="text-xs">written {formattedDate(data.date)}</time>
        <div tw="flex items-center">
          <div tw="flex flex-col mr-4">
            <p tw="mt-0 mb-1">Manel Escuer</p>
            <p tw="text-xs my-0 text-right">
              <a href="https://twitter.com/manelescuer" target="_blank" rel="noreferrer">
                @manelescuer
              </a>
            </p>
          </div>
          <div style={{ width: '39px', height: '39px', overflow: 'hidden' }}>
            <Image tw="rounded-full" src="/manel-thumb.jpg" width={42} height={39} />
          </div>
        </div>
      </div>
      <>{content}</>
    </Block>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: getSlugs().map((slug) => ({ params: { slug } })),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug.join('/')
  const props = await find(slug)
  return { props }
}

export default ArticlePage
