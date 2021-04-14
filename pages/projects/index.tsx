import Head from 'next/head'
import Block from '../../layout/block'
import { ReactElement } from 'react'
import ProjectsOverview from '../../components/projects-overview'
import projects from '../../projects.json'

export default function Projects(): ReactElement {
  return (
    <>
      <Head>
        <title>Projects - Manel Escuer</title>
        <meta
          name="description"
          content="Projects developed in spare time, mostly uncompleted. One day one of this projects will become a unicorn company 🦄"
        />
      </Head>

      <Block>
        <h1>Projects</h1>
        <ProjectsOverview projects={projects} />
      </Block>
    </>
  )
}
