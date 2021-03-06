import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FC } from 'react'

import { findAll } from '../../content'
import ArticleList from '../../components/article-list'
import { Article } from '../../@types/articles'
import Block from '../../layout/block'

interface ArticleProps {
  articles: Article[]
}

const Articles: FC<ArticleProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <Block>
        <ArticleList title="Articles" articles={articles} />
      </Block>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await findAll()
  return { props: { articles } }
}

export default Articles
