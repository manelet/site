import 'twin.macro'
import getConfig from 'next/config'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import Image from 'next/image'
import { FC } from 'react'
import { Article, ArticleData } from '../../@types/articles'

import { getSlugs, find } from '../../content'
import Block from '../../layout/block'
import { formattedDate } from '../../lib/utils'
import components from '../../components/mdx'
import { contentLinks } from '../../styles/fragments'

const { ogBaseUrl, baseUrl } = getConfig().publicRuntimeConfig

interface UrlParams {
  date: string
  excerpt: string
  image?: string
  image_width?: string
  image_height?: string
}

function buildOgUrl(data: ArticleData): string {
  const urlParams: UrlParams = { date: data.date ?? '', excerpt: data.excerpt ?? 'undefined' }

  if (!data || !data.image) {
    urlParams.image = baseUrl + '/manelet.png'
    urlParams.image_width = '1000'
    urlParams.image_height = '1500'
  } else {
    urlParams.image = baseUrl + '/' + data.image.src
    urlParams.image_width = data.image.width.toString()
    urlParams.image_height = data.image.height.toString()
  }

  return ogBaseUrl + data.title + '?' + new URLSearchParams(urlParams as Record<string, any>)
}

const ArticlePage: FC<Article> = ({ mdx, data }) => {
  const ogUrl = buildOgUrl(data)

  return (
    <>
      <Head>
        <title>{data.title} - Manel Escuer</title>
        <meta name="description" content={data.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@manelescuer" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={ogUrl} />
        <meta property="og:image" content={ogUrl} />
        <meta property="og:type" content="website"></meta>
      </Head>
      <Block customCss={[contentLinks]}>
        <h1 tw="text-4xl text-center">{data.title}</h1>

        <div tw="flex items-center justify-between text-gray-500 my-10">
          <time tw="text-sm">written {formattedDate(data.date)}</time>
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
                alt="Manel author thumbnail"
                src="/manel-thumb.jpg"
                layout="fill"
                tw="pointer-events-none"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </div>
        <MDXRemote {...mdx} components={components} />
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
