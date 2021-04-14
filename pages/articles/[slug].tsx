import 'twin.macro'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import Image from 'next/image'
import { FC } from 'react'
import { Article } from '../../@types/articles'

import { getSlugs, find } from '../../content'
import Block from '../../layout/block'
import { formattedDate } from '../../lib/utils'
import components from '../../components/mdx'

const ArticlePage: FC<Article> = ({ mdx, data }) => {
  const content = hydrate(mdx, { components })

  return (
    <>
      <Head>
        <title>{data.title} - Manel Escuer</title>
        <meta name="description" content={data.excerpt} />
      </Head>
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
            <div
              tw="relative rounded-full"
              style={{ width: '42px', height: '42px', overflow: 'hidden' }}
            >
              <Image
                src="/manel-thumb.jpg"
                layout="fill"
                tw="pointer-events-none"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </div>
        <>{content}</>
      </Block>
    </>
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
