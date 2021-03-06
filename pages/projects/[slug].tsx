import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { FC } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Project as TProject } from '../../@types/projects'
import { IconGithub } from '../../components/icons/github'
import { IconLink } from '../../components/icons/link'
import Block from '../../layout/block'
import { getSlugs, find } from '../../projects'

interface Params extends ParsedUrlQuery {
  slug: string
}

const IconLabelWrapper = styled.div`
  display: flex;

  span {
    width: 0px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  :hover {
    span {
      opacity: 1;
      width: auto;
    }
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
  return (
    <Block>
      <h1 tw="text-5xl text-white">{name}</h1>
      <p tw="text-white">{description}</p>
      <div tw="flex justify-between text-white">
        <code>{call_to_action}</code>
        <div tw="flex w-full justify-end">
          <IconLabel label="Visit site">
            <IconLink width={18} height={18} fill="white" />
          </IconLabel>

          <IconLabel label="Github">
            <IconGithub width={18} height={18} fill="white" />
          </IconLabel>
        </div>
      </div>
    </Block>
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
