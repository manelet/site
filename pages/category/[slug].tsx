import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import { Article } from '../../@types/articles'
import { Category } from '../../@types/category'
import ArticleList from '../../components/article-list'
import { findAll, getCategories } from '../../content'
import Block from '../../layout/block'
import { capitalize } from '../../lib/utils'

const CategoryPage: FC<{ slug: string; articles: Article[] }> = ({ slug, articles }) => {
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <Block>
        <ArticleList title={capitalize(slug)} articles={articles} />
      </Block>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categries = await getCategories()
  const paths = categries.map(({ slug }) => ({ params: { slug } }))

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories: Category[] = await getCategories()
  const category: Category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    return {
      notFound: true,
    }
  }

  const articles = await findAll({ category: category.slug })

  return {
    props: {
      slug: params.slug,
      articles,
    },
  }
}

export default CategoryPage
