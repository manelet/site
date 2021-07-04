import tw, { styled } from 'twin.macro'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../layout/hero'
import ArticleList from '../components/article-list'
import { findAll as findAllArticles } from '../content'
import { findAll as findAllProjects } from '../projects'
import ProjectsOverview from '../components/projects-overview'
import { Article } from '../@types/articles'
import { Project } from '../@types/projects'
import Block, { Wrapper, Inner } from '../layout/block'
import Button from '../components/button/button'
import Image from 'next/image'
import Link from 'next/link'

const Instagram = dynamic(() => import('../components/instagram'), { ssr: false })

interface HomeProps {
  articles: Article[]
  projects: Project[]
}

const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  bottom: 0;

  @media screen and (min-width: 768px) {
    max-width: 600px;
    max-height: 100vh;
    right: -100px;
    margin: 0;
  }
`

const MyInner = styled(Inner)`
  ${tw`items-center md:items-start justify-start md:justify-center! h-full`}
`

const GrayBlock = styled.div`
  ${tw`bg-gray-50 dark:bg-gray-900 border-0 border-t border-b border-gray-100 dark:border-gray-800 border-solid`}
`

const Home: FC<HomeProps> = ({ articles, projects }) => {
  return (
    <>
      <Head>
        <title>Manel Escuer - Frontend developer &amp; Product lover</title>
        <meta
          name="description"
          content="Manel is an experienced frontend developer based in Barcelona. Product lover, hopes to build it's own company any time soon."
        />
      </Head>

      <Hero>
        <MyInner>
          <div tw="w-full md:max-w-sm">
            <h1 tw="text-5xl mb-0">Manel Escuer</h1>
            <p tw="text-xl">
              Frontend engineer with eagerness to learn and improve &amp; Product lover with and
              entrepreneur spirit
            </p>
          </div>
          <ImageWrapper>
            <div>
              <Image
                alt="Manel welcome image"
                src="/manelet.webp"
                width={1000}
                height={1500}
                layout="responsive"
              />
            </div>
          </ImageWrapper>
        </MyInner>
      </Hero>

      <GrayBlock>
        <Block as="section">
          <div tw="py-6">
            <ArticleList title="Recently published" articles={articles} />
          </div>

          <Link href="/articles">
            <Button as="a">Read&apos;em all</Button>
          </Link>
        </Block>

        <Wrapper>
          <Inner tw="md:flex-col">
            <>
              <div tw="w-full flex flex-col justify-center">
                <h2>Projects</h2>
                <p>
                  I do love to start new projects on my spare time, sometimes to try out new
                  technologies some other times because I believe I&apos;ll get rich. Anyway I
                  usually don&apos;t finish them, but I do my best!{' '}
                  <span role="img" aria-label="unsfinished">
                    😅
                  </span>
                </p>
              </div>

              <ProjectsOverview projects={projects} />

              <Link href="/projects">
                <Button as="a">View&apos;em all</Button>
              </Link>
            </>
          </Inner>
        </Wrapper>
      </GrayBlock>

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
