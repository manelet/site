import { GetStaticProps } from 'next'
import { FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'twin.macro'
import Hero from '../layout/hero'
import ArticleList from '../components/article-list'
import { findAll as findAllArticles } from '../content'
import { findAll as findAllProjects } from '../projects'
import ProjectsOverview from '../components/projects-overview'
import { Article } from '../@types/articles'
import { Project } from '../@types/projects'
import Block, { Wrapper, Inner } from '../layout/block'
import Button from '../components/button/button'

const Instagram = dynamic(() => import('../components/instagram'), { ssr: false })

interface HomeProps {
  articles: Article[]
  projects: Project[]
}

const Home: FC<HomeProps> = ({ articles, projects }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero stripHeaderHeight>
        <h1>Manel Escuer</h1>
      </Hero>

      <Block as="section">
        <div tw="py-6">
          <ArticleList title="Recently published" articles={articles} />
        </div>
        <Button as="a">Read'em all</Button>
      </Block>

      <Wrapper>
        <Inner tw="md:flex-col">
          <>
            <div tw="w-full flex flex-col justify-center">
              <h2>Projects</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe accusamus distinctio
                ad ex quos deleniti error neque, fuga eveniet, corrupti accusantium, doloremque
                recusandae quidem qui nemo vitae nihil delectus iste.
              </p>
            </div>

            <ProjectsOverview projects={projects} />

            <Button as="a">View'em all</Button>
          </>
        </Inner>
      </Wrapper>

      <Instagram />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await findAllArticles()
  const projects = findAllProjects({ limit: 4 })
  return {
    props: {
      articles,
      projects,
    },
  }
}

export default Home
