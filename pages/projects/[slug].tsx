import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { FC } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Head from 'next/head'

import { Project as TProject } from '../../@types/projects'
import { IconGithub } from '../../components/icons/github'
import { IconLink } from '../../components/icons/link'
import { Wrapper, Inner } from '../../layout/block'
import { getSlugs, find } from '../../projects'
import projectComponents from '../../components/projects/index'
import { Wip } from '../../components/wip'
import { contentLinks } from '../../styles/fragments'

interface Params extends ParsedUrlQuery {
  slug: string
}

const IconLabelWrapper = styled.div`
  ${tw`flex relative`}

  svg {
    ${tw`cursor-pointer`}
  }

  span {
    ${tw`hidden opacity-0 absolute text-white bg-black text-center text-xs rounded px-2 py-2`}
    transition: all 0.3s ease-in-out;
    bottom: 20px;
    min-width: 120px;
    transform: translateX(-50%);
  }

  :hover {
    span {
      ${tw`inline-block opacity-75`}
    }
  }

  :not(:last-child) {
    ${tw`mr-2`}
  }
`

const ProjectHeaderWrapper = styled(Wrapper)`
  ${tw`z-10`}
  height: calc(350px - var(--nav-height));
`

const CallToAction = styled.code`
  ${tw`bg-black text-white opacity-50 p-3 rounded-lg transition-opacity flex-shrink-0`}

  :hover {
    ${tw`opacity-100`}
  }
`

const IconLabel: FC<{ label: string }> = ({ children, label }) => {
  return (
    <IconLabelWrapper>
      {children}
      <span>{label}</span>
    </IconLabelWrapper>
  )
}

const Project: FC<{ project: TProject }> = ({ project }) => {
  const { name, description, call_to_action } = project
  const Content = projectComponents[name]

  return (
    <>
      <Head>
        <title>{name} - Manel Escuer</title>
        <meta name="description" content={description} />
      </Head>
      <ProjectHeaderWrapper>
        <Inner>
          <h1 tw="text-5xl text-white">{name}</h1>
          <p tw="text-white">{description}</p>
          <div tw="flex justify-between text-white items-center">
            <CallToAction>{call_to_action}</CallToAction>
            <div tw="flex w-full justify-end">
              <IconLabel label="Visit site">
                <IconLink width={18} height={18} fill="white" />
              </IconLabel>

              <IconLabel label="Github">
                <IconGithub width={18} height={18} fill="white" />
              </IconLabel>
            </div>
          </div>
        </Inner>
      </ProjectHeaderWrapper>
      <Wrapper css={[contentLinks]}>
        <Inner>{Content ? <Content /> : <Wip />}</Inner>
      </Wrapper>
    </>
  )
}

export default Project

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: getSlugs().map((slug) => ({ params: { slug } })),
  }
}

export const getStaticProps: GetStaticProps<{ project: TProject }, Params> = async (ctx) => {
  const params = ctx.params as Params
  const project = find(params.slug)

  return {
    props: {
      project,
    },
  }
}
