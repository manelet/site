import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'

import { Article as TArticle } from '../@types/articles'
import { slugify, formattedDate } from '../lib/utils'

const ArticleList: FC<{ title: string; articles: TArticle[] }> = ({
  title = null,
  articles = [],
}) => {
  const { push } = useRouter()

  return (
    <>
      {title && <h2 tw="text-xl">{title}</h2>}

      {articles.map(({ data }, i) => {
        const slug = `/articles/${slugify(data.title)}`

        return (
          <Article key={`post-list-${i}`} onClick={() => push(slug)}>
            <div>
              <h3 tw="text-2xl">
                <Link href={slug}>{data.title}</Link>
              </h3>
              <Date>{formattedDate(data.date)}</Date>
              <p>{data.excerpt}</p>
            </div>
          </Article>
        )
      })}
    </>
  )
}

const Article = styled.div`
  ${tw`
    bg-white
    dark:bg-gray-800
    flex
    flex-col
    md:flex-row
    md:py-3
    md:px-6
    md:rounded
    cursor-pointer
    border-b
    border-l-0
    border-r-0
    border-t-0
    border-solid
    border-gray-300
    dark:border-gray-900
    text-black
    dark:text-white
  `}

  @media screen and (min-width: 768px) {
    transition: all 0.35s ease-in-out;

    :hover {
      ${tw`shadow-xl border-b-0`}
      transform: scale(1.023);
    }
  }
`

const Date = styled.time`
  ${tw`hidden items-center w-full text-gray-400 mr-10`}

  @media screen and (min-width: 768px) {
    ${tw`flex visible`}
    max-width: 150px;
  }
`

export default ArticleList
